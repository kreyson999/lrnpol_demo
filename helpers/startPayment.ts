import { PaymentMethod } from '@/services/API';
import axios from 'axios';
import { createHash } from 'crypto';
import Stripe from 'stripe';

type StartPaymentData = {
  id: string;
  price: number;
  serviceName: string;
  successUrl: string;
  cancelUrl: string;
};

export const startPayment = async (data: StartPaymentData) => {
  const PAYMENT_PROVIDER =
    (process.env.NEXT_PUBLIC_PAYMENTS_PROVIDER as PaymentMethod) || 'HOTPAY';

  if (PAYMENT_PROVIDER === PaymentMethod.HOTPAY) {
    const payment = {
      SEKRET: process.env.NEXT_PUBLIC_HOTPAY_SHOP_SECRET!,
      KWOTA: data.price.toString(),
      NAZWA_USLUGI: data.serviceName,
      ADRES_WWW: data.successUrl,
      ID_ZAMOWIENIA: data.id,
      TYP: 'INIT',
    };

    const formData = new FormData();
    formData.append('SEKRET', payment.SEKRET);
    formData.append('KWOTA', payment.KWOTA);
    formData.append('NAZWA_USLUGI', payment.NAZWA_USLUGI);
    formData.append('ADRES_WWW', payment.ADRES_WWW);
    formData.append('ID_ZAMOWIENIA', payment.ID_ZAMOWIENIA);
    formData.append('TYP', 'INIT');
    formData.append(
      'HASH',
      createHash('sha2-256')
        .update(
          process.env.HOTPAY_SHOP_PASSWORD +
            ';' +
            payment.KWOTA +
            ';' +
            payment.NAZWA_USLUGI +
            ';' +
            payment.ADRES_WWW +
            ';' +
            payment.ID_ZAMOWIENIA +
            ';' +
            payment.SEKRET
        )
        .digest('hex')
    );

    try {
      const response = await axios.post<{
        STATUS: boolean;
        URL: string;
      }>('https://platnosc.hotpay.pl', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data.STATUS !== true) {
        throw new Error('Nie udało się stworzyć linku do płatności!');
      }

      return {
        result: {
          paymentUrl: response.data.URL,
        },
      };
    } catch (error) {
      throw new Error('Nie udało się stworzyć linku do płatności!');
    }
  } else {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'blik', 'p24'],
        line_items: [
          {
            price_data: {
              currency: 'pln',
              product_data: {
                name: data.serviceName,
              },
              unit_amount: Math.round(data.price * 100), // Stripe używa najmniejszych jednostek waluty (groszy)
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        metadata: {
          orderId: data.id,
          amount: data.price.toString(),
        },
      });

    return {
      result: checkoutSession,
    };
  }
};
