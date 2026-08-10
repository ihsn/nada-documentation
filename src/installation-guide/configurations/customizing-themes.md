# Customizing themes (header, footer, and styling)

The **public catalog** appearance—top navigation, footer, typography, colors—is controlled by the **site theme**: PHP layouts and CSS under `themes/{theme-name}/`. The active theme is set in **`application/config/template.php`** via **`$template['theme_name']`** (by default **`nada52`**).

::: tip Administrator settings vs theme files
**Website title** and **Website footer** can be edited under [Site configurations](/admin-guide/web-ui/site-configurations). The theme must **output** those values where you want them (for example `website_title` is commonly used in the header/footer). If your footer does not show the admin **Website footer** text, edit the theme’s **`footer.php`** to include `<?php echo $this->config->item('website_footer'); ?>` where appropriate.
:::

## When to customize `nada52` directly

For **minor styling** or **only** changing the **header** and **footer**, you can edit the **default `nada52` theme** in place:

- **`themes/nada52/header.php`** — navbar, logo area, site title block.
- **`themes/nada52/footer.php`** — footer columns, copyright line, links.
- Related includes such as **`nav-menu.php`**, **`lang-bar.php`**, **`footer_top.php`** if your layout uses them (see **`layout.php`**).

Keep backups or use version control: upgrading NADA may overwrite files under **`themes/nada52/`** unless you exclude them deliberately.

## Custom CSS (`custom.css`)

Small visual tweaks (fonts, spacing, colors) should go in:

**`themes/nada52/css/custom.css`**

That file is linked from **`themes/nada52/head.php`**, so rules you add there apply across the themed pages without editing core stylesheets such as **`style.css`**.

Prefer **`custom.css`** for overrides so stock **`css/style.css`** stays easier to compare on upgrades.

## Larger or risky changes: copy the theme

If you plan **heavy** layout changes or want clean merges when upgrading:

1. Copy **`themes/nada52`** to a new folder, e.g. **`themes/my_catalog`**.
2. Set **`$template['theme_name']`** in **`application/config/template.php`** to **`my_catalog`** (folder name).
3. Edit **`header.php`**, **`footer.php`**, **`layout.php`**, and **`css/custom.css`** inside **`themes/my_catalog/`**.

## Main files to know

| Area | Typical files (`nada52`) |
|------|---------------------------|
| Page shell | `layout.php` — wraps `<head>`, header, content area, footer |
| Assets / `<head>` | `head.php` — loads CSS including **`css/custom.css`** |
| Header | `header.php` |
| Footer | `footer.php`, optional `footer_top.php` |
| Styles | `css/style.css`, **`css/custom.css`** (your overrides) |
| Images | `images/` — logos and icons referenced from header/footer |

## Related documentation

- [Customizing the home page](/admin-guide/web-ui/customizing-home-page) — body content at `/`, static views under `application/views/static/custom/`.
- [Tracking website traffic using Google Analytics](/installation-guide/configurations/google-analytics) — injecting scripts (often in `layout.php` / `<head>`).
- [Site configurations](/admin-guide/web-ui/site-configurations) — **Website title**, **Website footer**, caching.