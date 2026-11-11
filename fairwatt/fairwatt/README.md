# FairWatt prototype

Fairness engine for electricity tariffs (Global Energy Hackathon, Brief 16). All data is synthetic.

## Run locally
Open the folder in VS Code and use the Live Server extension on index.html,
or run: python -m http.server 8000  then open http://localhost:8000

## Files
- index.html  page structure
- style.css   styling (light and dark mode)
- app.js      data, fairness model and the three views

## Where to edit
- Feeder data: the F array at the top of app.js
- Assumptions: GEN (generator cost), COST (cost to serve), COLL (collection rate), LIFE (lifeline rate)
- Fairness Gap Index: the fgi line inside sim()
- Fairness-weighted tariff rules: hh() and alloc()

## Deploy
Static site: upload the folder to Netlify, Vercel, GitHub Pages or any web host.
