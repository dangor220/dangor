const fetch = require('node-fetch');

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async function submitForm(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return res.status(500).send('API key not configured.');
  }

  try {
    const { formData } = req.body;

    console.log('API_KEY:', API_KEY);

    const response = await fetch(`https://formhub.dev/io/${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.text();

    if (response.ok) {
      res.status(200).send(result);
    } else {
      res.status(response.status).send(result);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
