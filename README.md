# Questify

Enhance specific Quest features, disable annoyances, or completely remove Quests.

![An example of the Restyle and Reorder features.](https://github.com/user-attachments/assets/452ba894-d0e0-46d5-894a-af901c42d8e5)

Available natively in [Equicord](https://github.com/Equicord/Equicord), a Vencord fork, or as a userplugin (you're here!) in [Vencord](https://github.com/Vendicated/Vencord/).

## Features

### Quest Features

Modify how Quests behave, hide Quest-related UI, or disable Quest functionality entirely.

- Completely disable Quest functionality.
    - Hides the Quests page and Quest elements across Discord.
    - Prevents Discord from fetching Quest data.
    - Disables Questify's enhancements.
    - Does not remove Orbs from the shop due to their deep coupling as a secondary currency.
- Disable specific Quest UI:
    - Sponsored Banner
    - Relocation Notices
    - Friends List Promo
    - Members List Promo
    - Account Panel Promo
    - Account Panel Quest Progress
    - Quest & Orbs Badges
- Dangerous settings are gated behind a warning and confirmation.
    - Discord has warned users for modifying how Quests are completed.
    - Questify cannot realistically hide this behavior from Discord.
- Optional dangerous behavior:
    - Accelerate Video Quest auto-completion by using Discord's progress leeway and elapsed enrollment time.
    - Make some mobile-only Video Quests completable on desktop.
    - Stagger sequentially auto-completing Quests with random 5-second to 3-minute delays.
    - Auto-complete selected reward and task combinations from the Quests page.
    - Resume interrupted auto-completions after reloads or restarts.

Desktop-only Quest types are only available in official Discord desktop clients. Third-party clients such as web extensions, Vesktop, Equibop, and others cannot auto-complete Play on Desktop, PlayStation, Xbox, or Activity Quests due to Discord-side limitations.

### Quest Relevancy

Filter which Quests are eligible for various Questify settings. Quests that are queued, auto-completing, completed, or have any user progress are exempt from these filters.

- Prevent Notifications:
    - Exclude Quests matching selected reward and task combinations from Quest Button visibility, badge count, and new Quest alerts.
    - Exclude Quests whose Quest name, game title, or publisher contains any comma-separated term (case-insensitive) from Quest Button visibility, badge count, and new Quest alerts.
    - Supports optional strict field prefixes: `name:` / `quest:` for Quest name, `game:` / `title:` for game title, and `pub:` / `publisher:` for game publisher (space after the colon optional).
- Hide Quests:
    - Hide Quests matching selected reward and task combinations from the Quests page and ignore them across all Questify settings, including alerts and auto-completion.
    - Hide Quests whose Quest name, game title, or publisher contains any comma-separated term (case-insensitive, with the same optional field prefixes) from the Quests page and ignore them across all Questify settings, including alerts and auto-completion.

### Quest Button

Show a Quest button in the server list with optional indicators for unclaimed and unignored Quests.

- Button visibility:
    - Always
    - Unclaimed
    - Never
- Unclaimed indicator:
    - Pill
    - Badge
    - Both
    - None
- Badge color:
    - Use a custom badge color.
- Click actions can be configured separately for left, middle, and right click:
    - Open Quests
    - Context Menu
    - Plugin Settings
    - Nothing
- Context menu actions:
    - Mark All Ignored
    - Reset Ignored List
    - Fetch Quests

### Quest Notifications

Configure notifications, sounds, and periodic fetching for Quest updates.

- Quest completed:
    - Show a notification when a Quest is completed.
    - Play a sound when a Quest is completed.
    - Pick a volume from 0-100.
- New Quests detected:
    - Show a notification when matching new Quests are detected.
    - Play a sound when matching new Quests are detected.
    - Pick a volume from 0-100.
- New excluded Quests detected:
    - Show a notification when matching excluded Quests are detected.
    - Play a sound when matching excluded Quests are detected.
    - Questify fetches their Quest configs, applies your Quest Relevancy filters, and logs the resolved excluded Quest data to the console.
- Sounds:
    - Choose from Discord's bundled sounds.
    - Use the preview button in settings to test a sound and its volume.
- Quest Fetch Interval:
    - Disabled, 30 Minutes, 45 Minutes, 1 Hour, 3 Hours, 6 Hours, or 12 Hours.
    - Periodic fetching only runs when enabled and when the Quest Button or Quest Notifications settings make periodic updates useful.

### Quest Tiles

Customize how Quest tiles appear on the Quests page.

- Tile colors:
    - Unclaimed
    - Claimed
    - Ignored
    - Expired
- Each tile color can be enabled with a custom color or disabled to use Discord's default styling.
- Gradient style:
    - Intense Restyle Gradient
    - Default Restyle Gradient
    - Subtle Black Gradient
    - No Gradient
- Asset preload:
    - Load All Quest Assets On Page Load
    - Load Quest Assets During Page Scroll
- Settings include a live preview using one of your current Quests when available.

### Reorder Quests

Add a Questify sort option to the Quests page and control how Quest groups are ordered.

- Status order:
    - Unclaimed
    - Claimed
    - Ignored
    - Expired
- Subsorts:
    - Unclaimed: added date or expiring date.
    - Claimed: added date or claimed date.
    - Ignored: added date or expiring date.
    - Expired: added date or expiration date.
- On the All Quests tab, select **Filters > Questify > Show Hidden Quests** to temporarily reveal Quests hidden by Questify. The checkbox starts off each time you open the page. Other selected page filters still apply. Temporarily revealed Quests become exempted from Quest Relevancy if you start auto-completing them or gain progress normally, and from **Hide Non Auto-Completable Quests** if you gain progress normally. When you turn off **Show Hidden Quests**, explicitly hidden status groups are hidden again, even for Quests with progress.
- Temporarily revealed status groups appear after the normally visible groups in the default status order (Unclaimed, Claimed, Ignored, Expired). Each group keeps its selected sort.
- Quest page memory:
    - Remember the selected Quest page sort.
    - Remember selected Quest page filters.
    - If sort memory is disabled, the Quests page opens with the Questify sort option.
    - If filter memory is disabled, the Quests page opens without task or reward filters.

### Quest Tile Context Menu

Questify adds extra actions to Quest tile context menus:

- Mark as Ignored
- Unmark as Ignored
- Start Auto-Complete
- Stop Auto-Complete
- Copy Quest ID
