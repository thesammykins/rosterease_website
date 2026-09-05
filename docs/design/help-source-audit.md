# Help guide source audit

Checked on 5 September 2026 against the app worktree at base `63697d3` plus its in-progress review changes. The app-review task confirmed these corrections. This does not establish that a historical TestFlight build has the same interface.

| Guide | Verified behaviour and correction | App source |
| --- | --- | --- |
| Getting started | Shift Worker manages repeating rotations. Field Worker manages clients, work days and ordered visits. Per-client Visit Days are conditional on the installed build because this is newer than TestFlight 92. | `Sources/Features/Settings/SettingsView.swift`, app-review handoff |
| Smart Import | Review extracted data before applying. Shift imports create repeating patterns; split shifts and multiple workplaces in one source are unsupported. Client visit-day handling is qualified by build. No handwriting accuracy promise. | `Sources/Services/RosterImportService.swift`, `Sources/Services/FieldImportService.swift` |
| Calendar and privacy | Calendar Sync appears only in Shift Worker. Select a workplace. Include Shift Notes is the actual opt-in label. Field Worker does not have the Calendar Sync destination. | `Sources/Features/Settings/SettingsView.swift:383`, `:1451`, `:1482` |
| Calendar and privacy | Actual settings destinations are Travel Defaults and Privacy & Display. Privacy lock replaces widget details with private placeholders. | `Sources/Features/Settings/SettingsView.swift:966`, `:974`, `:1588` |
| Backup and restore | Open Settings > Data Management > Backups. Enter Backup passphrase and Confirm passphrase before tapping Export Backup. At least 8 characters are required. Restore Backup is in the same section. | `Sources/Features/Settings/BackupManagementCard.swift:91`, `:195` |
| Backup and restore | Restore replaces current app data. Preserve a separate backup before replacement. Multiple Shift workplaces require Plus capacity. | `Sources/Shared/BackupRestoreAction.swift`, `Sources/Services/BackupService.swift`, `Sources/Services/FeatureAccessPolicy.swift` |

Public guides preserve exact feature names, the encryption/passphrase limitation, local-data recovery precautions and optional-sharing boundaries. The approved Privacy Policy and Terms of Use were not rewritten as part of editorial cleanup.

Before a release, compare these routes to the candidate build. A source audit cannot verify system permission prompts, purchases, file-provider behaviour or every live navigation path on a device.
