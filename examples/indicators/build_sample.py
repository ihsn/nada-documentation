"""Build the NADA indicator sample (SI.POV.DDAY) from the Metadata Editor docs copy.

Usage: python3 -I build_nada_indicator_sample.py <editor_indicator_dir> <out_dir>
"""
import csv
import json
import os
import shutil
import sys

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

COLUMNS = ["INDICATOR", "INDICATOR_LABEL", "REF_AREA", "YEAR", "VALUE"]


def read_rows(name):
    # utf-8-sig drops the BOM some source files carry
    with open(os.path.join(src, name), encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def write_rows(name, rows):
    rows = sorted(rows, key=lambda r: (r["REF_AREA"], int(r["YEAR"])))
    with open(os.path.join(out, name), "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(COLUMNS)
        for r in rows:
            w.writerow([r[c].strip() for c in COLUMNS])
    return rows


full = write_rows("SI.POV.DDAY_data.csv", read_rows("SI.POV.DDAY_countries_data-long.csv"))
write_rows("SI.POV.DDAY_data-6-countries.csv", read_rows("SI.POV.DDAY_countries_data-long-partial.csv"))

countries = {}
for r in full:
    countries[r["REF_AREA"]] = r["REF_AREA_LABEL"].strip()
indicator_label = full[0]["INDICATOR_LABEL"].strip()
years = sorted(int(r["YEAR"]) for r in full)

dsd_ref = {"idno": "WB_WDI_COUNTRY_YEAR_1.0", "agency": "WB", "name": "WDI_COUNTRY_YEAR", "version": "1.0"}

dsd = {
    "data_structure": {
        **dsd_ref,
        "title": "WDI indicators by country and year",
        "description": "One value per indicator, country and year. Can be shared by any annual, country-level indicator.",
        "components": [
            # No codelist on indicator ID / name: one indicator per entry by design
            {"name": "INDICATOR", "label": "Indicator", "column_type": "indicator_id", "data_type": "string"},
            {"name": "INDICATOR_LABEL", "label": "Indicator name", "column_type": "indicator_name", "data_type": "string"},
            {
                "name": "REF_AREA", "label": "Country", "column_type": "geography", "data_type": "string",
                "codelist": {
                    "idno": "WB_CL_REF_AREA_1.0", "agency": "WB", "name": "CL_REF_AREA", "version": "1.0",
                    "description": "ISO 3166-1 alpha-3 country codes and World Bank country names (countries in the SI.POV.DDAY sample).",
                    "items": [
                        {"code": code, "label": countries[code], "sort_order": i + 1}
                        for i, code in enumerate(sorted(countries))
                    ],
                },
            },
            {"name": "YEAR", "label": "Year", "column_type": "time_period", "data_type": "string", "time_period_format": "YYYY"},
            {"name": "VALUE", "label": "Value", "column_type": "observation_value", "data_type": "double"},
        ],
    }
}

# Reference metadata: World Bank WDI text, as used in the Metadata Editor quick start
metadata = {
    "series_description": {
        "idno": "SI.POV.DDAY",
        "name": indicator_label,
        "alternate_identifiers": [{"identifier": "SI.POV.DDAY", "database": "WDI"}],
        "measurement_unit": "%",
        "periodicity": "Annual",
        "definition_short": "Poverty headcount ratio at $3.00 a day is the percentage of the population living on less than $3.00 a day at 2021 international prices.",
        "definition_long": "Poverty headcount ratio at $3.00 a day is the percentage of the population living on less than $3.00 a day at 2021 purchasing power adjusted prices. As a result of revisions in PPP exchange rates, poverty rates for individual countries cannot be compared with poverty rates reported in earlier editions.",
        "methodology": "International comparisons of poverty estimates entail both conceptual and practical problems. Countries have different definitions of poverty, and consistent comparisons across countries can be difficult. Local poverty lines tend to have higher purchasing power in rich countries, where more generous standards are used, than in poor countries. Since World Development Report 1990, the World Bank has aimed to apply a common standard in measuring extreme poverty, anchored to what poverty means in the world's poorest countries. The welfare of people living in different countries can be measured on a common scale by adjusting for differences in the purchasing power of currencies. The statistics reported here are based on consumption data or, when unavailable, on income surveys.",
        "limitation": "Despite progress in the last decade, the challenges of measuring poverty remain. The timeliness, frequency, quality, and comparability of household surveys need to increase substantially, particularly in the poorest countries. The availability and quality of poverty monitoring data remains low in small states, countries with fragile situations, and low-income countries and even some middle-income countries. The low frequency and lack of comparability of the data available in some countries create uncertainty over the magnitude of poverty reduction.",
        "relevance": "The World Bank Group is committed to reducing extreme poverty to 3 percent or less, globally, by 2030. Monitoring poverty is important on the global development agenda as well as on the national development agenda of many countries.",
        "sources": [{
            "name": "World Bank, Poverty and Inequality Platform",
            "organization": "World Bank",
            "uri": "https://pip.worldbank.org",
            "note": "Data are based on primary household survey data obtained from government statistical agencies and World Bank country departments. Data for high-income economies are mostly from the Luxembourg Income Study database.",
        }],
        "topics": [{"name": "Poverty"}, {"name": "Poverty rates"}],
        "time_periods": [{"start": str(years[0]), "end": str(years[-1])}],
        "geographic_units": [{"code": c, "name": countries[c], "type": "country"} for c in sorted(countries)],
        "license": [{"name": "CC BY-4.0", "uri": "https://creativecommons.org/licenses/by/4.0/"}],
        "notes": [{"note": "The World Bank's internationally comparable poverty monitoring database draws on income or detailed consumption data from more than 2000 household surveys across 169 countries. See the Poverty and Inequality Platform (PIP) for details (pip.worldbank.org)."}],
    },
    "data_structure_reference": dsd_ref,
}

for name, obj in [("SI.POV.DDAY_dsd.json", dsd), ("SI.POV.DDAY_metadata.json", metadata)]:
    with open(os.path.join(out, name), "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write("\n")

shutil.copyfile(os.path.join(src, "poverty_thumbnail.jpg"), os.path.join(out, "SI.POV.DDAY_thumbnail.jpg"))

print("rows", len(full), "countries", len(countries), "years", years[0], years[-1])
