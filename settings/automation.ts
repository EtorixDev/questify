/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SettingsStore } from "@api/Settings";

import { initialQuestDataFetched } from "../state";
import { processQuests, stopQuestProcessing } from "../utils/completion";
import { QL } from "../utils/logging";
import { type Quest, QuestStore } from "../utils/types";
import { getQuestifySettings } from "./access";
import { startAutoFetchingQuests } from "./fetching";

const automationSettingKeys = ["autoEnrollQuests", "autoCompleteQuests", "allowChangingDangerousSettings", "disableQuestsEverything"] as const;
const automationStartDelayMs = 10000;
let automationActive = false;
let automationStartTimeout: ReturnType<typeof setTimeout> | null = null;

export function processAutomaticQuests(quests: readonly Quest[]): void {
    const settings = getQuestifySettings();

    if (
        !automationActive ||
        automationStartTimeout !== null ||
        settings.disableQuestsEverything ||
        !settings.allowChangingDangerousSettings ||
        (!settings.autoEnrollQuests && !settings.autoCompleteQuests)
    ) {
        return;
    }

    void processQuests(quests, { autoComplete: settings.autoCompleteQuests, source: "auto" }).catch(error => {
        QL.error("AUTOMATIC_QUEST_PROCESSING_FAILED", { error });
    });
}

function cancelAutomaticQuestStart(): void {
    if (automationStartTimeout !== null) {
        clearTimeout(automationStartTimeout);
        automationStartTimeout = null;
        QL.info("QUEST_AUTOMATION_DEBOUNCE_CANCELLED");
    }
}

function onAutomationSettingsChanged(): void {
    stopQuestProcessing("auto");
    cancelAutomaticQuestStart();
    startAutoFetchingQuests(true);

    const settings = getQuestifySettings();

    if (
        !automationActive ||
        settings.disableQuestsEverything ||
        !settings.allowChangingDangerousSettings ||
        (!settings.autoEnrollQuests && !settings.autoCompleteQuests)
    ) {
        return;
    }

    automationStartTimeout = setTimeout(() => {
        automationStartTimeout = null;

        if (initialQuestDataFetched) {
            processAutomaticQuests(Array.from(QuestStore.quests.values()));
        }
    }, automationStartDelayMs);

    QL.info("QUEST_AUTOMATION_DEBOUNCE_STARTED", { delayMs: automationStartDelayMs, autoEnroll: settings.autoEnrollQuests, autoComplete: settings.autoCompleteQuests });
}

export function initializeQuestAutomation(): void {
    if (automationActive) {
        return;
    }

    automationActive = true;

    for (const key of automationSettingKeys) {
        SettingsStore.addChangeListener(`plugins.Questify.${key}`, onAutomationSettingsChanged);
    }
}

export function disposeQuestAutomation(): void {
    automationActive = false;
    cancelAutomaticQuestStart();
    stopQuestProcessing("auto");

    for (const key of automationSettingKeys) {
        SettingsStore.removeChangeListener(`plugins.Questify.${key}`, onAutomationSettingsChanged);
    }
}
