Herbarium Manager Interface (spec)
Purpose

A manager-facing, desktop-first tool to build and curate the herbarium (plants dictionary) that powers the field app’s common-name UX. It manages names, groups, images, seasons/phenophases, control windows, and regional status—without forcing scientific jargon on field users.

Primary personas

Manager/Curator: adds/edits taxa, images, names, groups; reviews triage.

Lead Tech (optional): bulk imports, merges duplicates, sets regional preferences.

Viewer: read-only (contractors/clients).

Information architecture

Herbarium Home

Global search (common/scientific), filters, create/import actions.

Taxon Detail (tabs)

Overview • Names • Images • Control Windows • Propagation • Look-alikes • Regions • References • History

Groups

Group list & detail (membership manager).

Triage

Pending aliases, ambiguous matches, duplicate names, low-confidence imports.

Import Wizard

CSV upload → column mapping → validation → preview → commit.

Core flows
A) Create a new species (taxon)

From Home → New species.

Enter scientific name (autocomplete against existing), genus/family optional.

Add preferred common name (US-MI); add others as needed, mark preferred.

Set local flags (native/invasive), growth form, lifecycle, bloom months.

Save → lands on Taxon Detail.

B) Add/curate common names (region-aware)

In Names tab: list table with name • region • preferred • weight.

Actions: Add, Set preferred (region), Adjust weight, Deprecate, Merge with…

Live preview: “Display label in US-MI → Purple coneflower”.

C) Upload and tag images

In Images: drag & drop or select from storage.

Required: season tags (winter/spring/summer/fall) or capture date; optional phenophase & view (whole/leaf/flower/etc.), license/credit.

Toggle Reference quality for ID cards.

Bulk edit season/phenophase across selected images.

D) Define control windows

Add rows: method • best months • target phenophase • follow-up days • notes.

“Show me current month” filter; copy methods across related taxa.

E) Manage groups (for ambiguous logging)

Groups list: “thistles (Cirsium spp.)”, “goldenrods”, etc.

Group detail: group name, region (optional), type, notes; Add/Remove members via searchable picker; quick “add entire genus” helper.

F) Triage queue

Pending alias: “queen annes lace” → propose mapping to Daucus carota; approve/redirect/deprecate.

Ambiguous match: same common name used for multiple taxa—pick preferred per region.

Duplicate detection: identical common name/region; auto-merge suggestion.

Low-confidence import rows: fix and accept.

G) Import CSV (seed/updates)

Upload CSV.

Map columns (auto-detect), choose region_code default and conflict policy (skip/merge/create pending).

Validate: see errors/warnings.

Preview diff (new vs update).

Commit (async), view import report.

Screens (wireframe-level)
1) Herbarium Home

Header: Search box (common/scientific), “+ New species”, “Import CSV”, “Triage (badge)”.

Filters: native/invasive status; growth form; lifecycle; bloom month; season (for image availability); region (for name display).

Grid/List: card per species with: display common name (for region), tiny scientific name, native/invasive chip, bloom months dots, image thumbnail.

Bulk actions: export subset (CSV/JSON), open in new tabs.

2) Taxon Detail

Header: Display name (for selected region) · scientific name small · chips (native/invasive, growth form, lifecycle) · actions: “+ Image”, “+ Common name”, “Duplicate”, “Delete”.

Tabs:

Overview: key facts; bloom calendar; quick links to add common name/image.

Names: table + “Add name” dialog (name, region, preferred, weight). Inline set preferred.

Images: gallery; filters (season/phenophase/view/license); bulk edit; ref-quality toggle; attribution editor.

Control Windows: table of methods; add/edit; current-month highlight.

Propagation: optional table (method, best months, notes).

Look-alikes: add pairings + diff notes; link out to other taxon pages.

Regions: per-region overrides (is_native, invasive_status, legal notes).

References: add citation rows (title/url/publisher/year).

History: audit log (who/what/when).

3) Groups

List: search groups; filters by region and type.

Detail: name, region, type, notes, active toggle; Members pane with add/remove; “suggested members” (by genus or alias usage data).

4) Triage

Tabs: Aliases • Ambiguities • Duplicates • Imports

Each row shows recommendation + actions (Approve • Map elsewhere • Deprecate • Merge).

Keyboard shortcuts for speed.

5) Import Wizard

Step 1: upload; file seen.

Step 2: mapping UI with dropdowns per column; region default input.

Step 3: validation report (errors/warnings), quick-fix inline editors.

Step 4: preview diff; choose conflict policy.

Step 5: commit + summary (created/updated/skipped/pending).

Components (contracts the agent can implement)

SearchBox

Props: query, regionCode

Events: onSearch(q)

NameEditor

Props: taxonId, regionCode

Actions: add/edit/delete, setPreferred(nameId), setWeight(nameId, n)

ImageUploader & ImageCard

Props: taxonId

Fields: seasonTags[], phenophase, view, license, photographer, isReference

Bulk edit: apply tags to selection

ControlWindowTable

Row: {method, bestMonths[], targetPhenophase, followupDays, notes}

GroupPicker

Props: groupId

Actions: addMembers(taxonIds[]), removeMember(taxonId)

TriageRow

Types: alias | ambiguity | duplicate | import

Actions: approve() | mapToTaxon(id) | mapToGroup(id) | deprecate() | merge(targetId)

SeasonFilter

Enum: winter/spring/summer/fall; drives image and name ranking previews

RegionSelector

Affects display names and regional chips

AuditTrail

Shows CRUD events; filter by user/date/table

Behaviors & rules

Display label: always use SQL function display_common_name(taxon_id, region); fall back to scientific if none.

Unique constraints: enforced via partial unique indexes (already in DB). UI should surface friendly errors if a duplicate name/region is added.

Images: at least one reference-quality image per species is suggested (not required).

Aliases: adding a new alias that conflicts routes to Triage instead of failing hard.

Region awareness: every “preferred” and “weight” operation is scoped to current regionCode.

Undo: lightweight undo for destructive actions within 30s.

Accessibility & ergonomics

Keyboard-first admin tasks (tab order, Enter to save, Esc to cancel).

High-contrast theme; large tap targets; clear focus states.

Image dialogs accept drag-drop and paste from clipboard.

Instant autosave with visible “Saved ✓” status; offline queue (optional).

Telemetry (optional, privacy-safe)

Track: failed imports, duplicate/alias rates, missing reference images, triage backlog size.

No PII; aggregate counts only.

MVP cut (first shipping slice)

Herbarium Home (search + filters + create)

Taxon Detail: Overview, Names, Images, Control Windows

Groups: list + simple membership editor

Triage: Aliases tab

Import Wizard (basic mapping & validation)

Open questions

Do we require at least one image per taxon before it appears in field suggestions?

Should we allow per-client region overrides in addition to geographic regions?

Do we show scientific name by default, or only in a tooltip?
