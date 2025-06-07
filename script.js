// Handle condition switching
document.getElementById('condition').addEventListener('change', function () {
    const condition = this.value;
    const form = document.getElementById('diabetesForm');
    const comingSoon = document.getElementById('comingSoon');

    if (condition === 'diabetes') {
    form.style.display = 'block';
    comingSoon.style.display = 'none';
    } else {
    form.style.display = 'none';
    comingSoon.style.display = 'block';
    }
});

document.getElementById('healthForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const riskDisplay = document.getElementById('risk');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Analyzing...';

    const data = {
        HighBP: parseInt(document.getElementById('HighBP').value),
        HighChol: parseInt(document.getElementById('HighChol').value),
        BMI: parseFloat(document.getElementById('BMI').value),
        Smoker: parseInt(document.getElementById('Smoker').value),
        Stroke: parseInt(document.getElementById('Stroke').value),
        HeartDiseaseorAttack: parseInt(document.getElementById('HeartDiseaseorAttack').value),
        PhysActivity: parseInt(document.getElementById('PhysActivity').value),
        Fruits: parseInt(document.getElementById('Fruits').value),
        Veggies: parseInt(document.getElementById('Veggies').value),
        HvyAlcoholConsump: parseInt(document.getElementById('HvyAlcoholConsump').value),
        Sex: parseInt(document.getElementById('Sex').value),
        Age: parseInt(document.getElementById('Age').value)
    };

    let diagnosisText = "";

    try {
        const response = await fetch('https://medscope-ml-backend.onrender.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        diagnosisText = result.diagnosis ? result.diagnosis.toUpperCase() : "ERROR";

    } catch (error) {
        diagnosisText = "SERVER ERROR";
    } finally {
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
            riskDisplay.textContent = diagnosisText; // Show result only after button resets
        }, 1500);
    }
});


