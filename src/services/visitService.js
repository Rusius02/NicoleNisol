// services/visitService.js
export async function registerVisit() {
  try {
    const response = await fetch('https://localhost:5001/api/Stats/visit', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Visite enregistrée :', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de l’enregistrement de la visite :', error);
  }
}
