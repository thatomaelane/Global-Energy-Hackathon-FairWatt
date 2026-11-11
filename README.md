# FairWatt

> A web platform that makes electricity tariff fairness measurable. It compares what each neighbourhood actually receives with what it pays, identifies where support is needed most, and shows whether a fairer tariff can pay for itself.

![HTML](https://img.shields.io/badge/HTML5-Web%20App-red)
![CSS](https://img.shields.io/badge/CSS3-Responsive-lightgrey)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-black)
![Data](https://img.shields.io/badge/Data-Synthetic-blue)
![Status](https://img.shields.io/badge/Status-Prototype-brightgreen)

---

# Global Energy Hackathon

The **Global Energy Hackathon** is an online competition (30 October to 1 November 2026, hosted at hackathon.anneru.com) where teams respond to real energy problems described in published problem briefs. Teams build a working prototype or model, deliver a 3-minute pitch, and submit a one-page impact estimate.

Projects are judged on:

| Criterion | Weight |
|---|---|
| Impact | 25% |
| Innovation | 25% |
| Sustainability | 25% |
| Technical feasibility | 15% |
| Scalability | 10% |

## Brief 16: Designing a Fair Tariff for Electricity for All

**Track:** Policy and Community-Based Solutions. **Focus region:** Nigeria, applicable across Africa.

Nigeria groups electricity customers into five service bands, guaranteed from 20 hours a day (Band A) down to 4 hours (Band E). Band A customers pay cost-reflective tariffs, while about 85% of customers on Bands B to E receive subsidised rates. The brief highlights several problems:

- Supply is scarce, so access is rationed by feeder rather than by need.
- Promised hours are not always delivered, yet customers are billed for them.
- Subsidies are largely untargeted, costing about ₦200 billion a month.
- Low supply pushes households and small businesses towards expensive diesel generators.
- Distribution losses of around a third of energy value weaken the utility's finances.

The brief asks teams to define fairness, protect low-income households and essential services, keep the utility financially viable, and use data that regulators and utilities can realistically collect.

---

# Project Overview

FairWatt is a web application that gives consumers, regulators and utilities one shared, evidence-based view of electricity fairness.

It does not propose a new policy from scratch. Nigeria already has service bands, lifeline tariffs, subsidies and metering programmes. FairWatt makes them **visible and checkable**, then tests what a fairer allocation would cost.

The application works on phones and laptops and runs entirely in the browser.

---

# Project Objectives

- Show customers, in plain language, whether they receive the service they pay for.
- Measure fairness with a single transparent index that regulators can use to target support.
- Show where metering gaps make fair billing impossible.
- Test whether a fairness-weighted tariff can recover costs and avoid making low-income households worse off.
- Stay robust if electricity supply halves or doubles.

---

# Key Features

### My Household

- Hours of power received versus hours promised by the household's band
- Service score and plain-language verdict
- Estimated monthly refund when promised hours are not delivered
- True cost per useful kWh, including generator fuel
- Share of income spent on electricity, flagged above 10%
- Community outage reporting to support independent verification of supply hours

### Regulator View

- Fairness Gap Index (0 to 100) for every feeder
- Tile map that switches between fairness gap and metering coverage
- Priority list for lifeline support
- Feeder details: hours, households, income, essential facilities and a suggested action

### Utility and Funding

- Comparison of today's flat bands with a fairness-weighted model
- Controls for supply level (50% to 200%), the hour cap for high-income areas, and the surcharge
- Cost recovery, subsidy needed per month, hours and income burden for low-income areas
- An automatic verdict that checks that no low-income area is worse off than today

---

# How the Fairness Model Works

## Fairness Gap Index

For each feeder, the index combines three measures:

```text
Fairness Gap Index = 40 x min(1, 2.5 x hours shortfall)
                   + 40 x min(1, income burden / 20%)
                   + 20 x (1 - metering coverage)
```

- **Hours shortfall:** the share of promised hours that was not delivered.
- **Income burden:** total monthly electricity spend, including generator fuel, divided by household income.
- **Metering coverage:** unmetered areas are billed by estimate, so fairness cannot be verified.

Scores below 35 are shown in green, 35 to 59 in amber, and 60 or above in red.

## True cost of electricity

```text
Grid units       = monthly need x min(1, delivered hours / 18)
Generator units  = 30% of the remaining gap (the rest is unmet need)
Total spent      = grid bill + generator units x generator cost
True cost per kWh = total spent / units actually used
```

## Fairness-weighted tariff model

1. **Service refund:** the tariff is scaled down when delivered hours fall below the band promise.
2. **Lifeline block:** low-income areas pay a reduced rate for their first 50 kWh.
3. **Solidarity cap:** high-income areas have their hours capped. Hours above the cap are redistributed to feeders below their promised hours, with low-income feeders weighted double. High-income areas also pay a surcharge that helps fund the model.

## Assumptions (editable)

| Assumption | Value |
|---|---|
| Generator cost | ₦600 per kWh |
| Cost to serve | ₦190 per kWh |
| Collection efficiency | 81% |
| Lifeline rate | ₦20 per kWh (first 50 kWh) |
| Low-income threshold | ₦200,000 per month |
| High-income threshold | ₦500,000 per month |

---

# Data

All data in this prototype is **synthetic**. It was built from public figures in the brief and NERC reports, including Band A tariffs of about ₦225 per kWh, roughly 36% distribution losses and about 81% collection efficiency.

The prototype contains eight illustrative feeders in an Abuja-style city with different bands, incomes, supply hours and metering levels. The data pack in the brief lists the real sources that would replace them: distribution company consumption and feeder data, NERC tariff orders and quarterly reports, and household data from the National Bureau of Statistics, World Bank and DHS.

---

# Technologies Used

- HTML5
- CSS3 (responsive layout)
- JavaScript (vanilla, no frameworks or build step)
- Inter typeface via Google Fonts

---

# Repository Structure

```text
FairWatt/
│
├── README.md
├── index.html
├── style.css
└── app.js
```

| File | Purpose |
|---|---|
| index.html | Page structure |
| style.css | Styling and responsive layout |
| app.js | Synthetic data, fairness model and the three views |

---

# Running the Project

### Option 1: Terminal

```bash
cd FairWatt
python -m http.server 8000
```

Then open `http://localhost:8000`. On some systems use `python3` instead of `python`.

### Option 2: VS Code

Open the folder and run `index.html` with the Live Server extension.

### Where to edit

- Feeder data: the `F` array at the top of `app.js`
- Assumptions: the constants `GEN`, `COST`, `COLL` and `LIFE`
- Index weights: the `fgi` calculation inside `sim()`
- Tariff rules: the `hh()` and `alloc()` functions

---

# Alignment with the Brief

| Brief requirement | How FairWatt responds |
|---|---|
| Fairness framework | Fairness Gap Index and the fairness-weighted tariff rules |
| Economic model | Cost recovery and subsidy calculations with adjustable assumptions |
| Customer impact analysis | Household report card and income burden for low-income areas |
| Prototype | Working browser-based tariff simulator and policy dashboard |
| Protect essential services | Essential facilities flagged on low-supply feeders |
| Use realistic data | Hours, bills, income and metering are all data utilities and regulators can collect |
| Supply doubles or halves | Supply slider from 50% to 200% |

---

# Limitations

- Synthetic data only; the model has not been validated against real feeder data.
- Assumptions such as generator cost and the index weights are placeholders for calibration.
- Changes in tariffs do not yet change how much households consume.
- Community outage reports are a demonstration and do not yet feed the scores.
- The regulatory proposal and enforcement design are presented separately from this prototype.

---

# Future Improvements

- Integrate real distribution company and NERC data
- Crowdsourced and meter-based verification of supply hours
- SMS and USSD access for households without smartphones
- Household vulnerability targeting with privacy safeguards
- Quality measures beyond hours, such as outage frequency and voltage
- Comparison across state electricity markets
- Cloud deployment and role-based access for regulators and utilities

---

# Live Demo

*Add the deployed link here*

---

# Team

**[Name]** *(Project Leader)*

**[Name]**

**[Name]**

*Developed for the Global Energy Hackathon, Brief 16.*

---

## ⭐ If you found this project useful, consider giving the repository a star!
