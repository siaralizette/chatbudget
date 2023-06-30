const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/budget', (req, res) => {
    const { totalIncome, numDependents } = req.body;

    if (isNaN(totalIncome) || isNaN(numDependents)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const income = parseInt(totalIncome);
    const dependents = parseInt(numDependents);

    if (income < 934 || dependents < 1) {
        return res.status(400).json({ error: 'Invalid income or number of dependents' });
    }

    const monthlyIncomePerPerson = Math.round(income / dependents);
    if (monthlyIncomePerPerson < 934) {
        return res.status(400).json({ error: 'Income per person is less than 934' });
    }

    const needs = Math.round(income * 0.5);
    const luxuries = Math.round(income * 0.3);
    const savings = Math.round(income * 0.2);

    const budget = {
        needs,
        luxuries,
        savings
    };

    res.json(budget);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
