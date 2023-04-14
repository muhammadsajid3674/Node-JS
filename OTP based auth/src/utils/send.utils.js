import fetch from 'node-fetch';
import { SMS_SERVICE_PLAN_ID, SMS_SINCH_NUMBER } from '../env.config.js'

async function sendMessage({ token, number }) {
    const SERVICE_PLAN_ID = SMS_SERVICE_PLAN_ID;
    const API_TOKEN = token;
    const SINCH_NUMBER = SMS_SINCH_NUMBER;
    const TO_NUMBER = number;
    try {
        const resp = await fetch(
            'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + API_TOKEN
                },
                body: JSON.stringify({
                    from: SINCH_NUMBER,
                    to: [TO_NUMBER],
                    body: 'Programmers are tools for converting caffeine into code. We just got a new shipment of mugs! Check them out: https://tinyurl.com/4a6fxce7!'
                })
            }
        );
        // const data = await resp.json();
        // console.log(data);
        console.log(resp);
    } catch (error) {
        console.log(error);
    }
}

export default sendMessage