# Analytics reports

The analytics reports section provides statistics about catalog usage — pageviews, file downloads, top-viewed studies, and trends over time. This draws on events logged directly by NADA and is separate from external tools such as Google Analytics.

::: info Screenshot
_Add screenshot: Analytics reports overview dashboard with KPI cards and 7-day chart_
:::

## Accessing analytics reports

Go to **Reports → Analytics reports** in the administrator menu.

## Overview dashboard

The overview shows key metrics at a glance:

- Today's pageviews and downloads
- Monthly trend summary
- Top studies by views
- Top files by downloads
- Recent activity feed
- 7-day view and download chart

## Raw data

### Pageviews

Individual page view events. Filter by date range or study ID. Data can be exported to CSV or JSON.

### Downloads

Individual file download events with the same filter and export options.

::: info Screenshot
_Add screenshot: Raw data tab showing pageviews with date filter applied_
:::

## Aggregated data

### Daily

Day-by-day totals grouped by study or file. Use this view for a granular breakdown of activity.

### Monthly

Monthly summaries with trend charts for identifying longer-term patterns.

## Aggregations

Raw events are processed through an aggregation pipeline to populate the daily and monthly views. Run aggregations periodically — for example, as a scheduled nightly task — to keep the data current.

| Step | What it does |
|---|---|
| Daily | Aggregates raw events into daily totals (up to yesterday) |
| Monthly | Rolls daily totals into monthly summaries |
| Month-end | Finalizes past months and removes daily rows to save space |
| Cleanup | Deletes raw events older than 60 days |
| Sync | Updates view and download counters on catalog entries |

Click **Run full aggregation** to execute all steps, or run individual steps as needed.

::: info Screenshot
_Add screenshot: Aggregation controls panel showing pipeline steps and last-run timestamp_
:::

## Recommendations

For comprehensive web analytics (sessions, referrers, geographic breakdown), use an external tool such as Google Analytics. NADA's built-in analytics focuses on catalog-specific events — study views and file downloads.
