'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Lock, CheckCircle, X } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const CheckoutForm = ({ clientSecret, eventName, eventId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [cardholderName, setCardholderName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!cardholderName.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter the cardholder name',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: cardholderName,
          },
        },
      });

      if (error) {
        toast({
          title: 'Payment Failed',
          description: error.message,
          variant: 'destructive',
        });
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        // Confirm payment on backend
        await axios.post(
          `${API}/payments/confirm-payment/${eventId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setSucceeded(true);
        toast({
          title: 'Payment Successful',
          description: 'Your event has been activated!',
        });
        
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setProcessing(false);
    }
  };

  if (succeeded) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">Your event has been activated.</p>
        <p className="text-sm text-gray-500">Redirecting to your event...</p>
      </div>
    );
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cardholder Name */}
      <div>
        <Label htmlFor="cardholderName" className="text-sm font-medium text-gray-700">
          Cardholder Name
        </Label>
        <Input
          id="cardholderName"
          type="text"
          placeholder="John Doe"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
          className="mt-2 h-12"
        />
      </div>

      {/* Card Number */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2">
          Card Number
        </Label>
        <div className="p-4 border border-gray-300 rounded-lg bg-white mt-2">
          <CardNumberElement options={cardElementOptions} />
        </div>
      </div>

      {/* Card Expiry and CVC in a row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </Label>
          <div className="p-4 border border-gray-300 rounded-lg bg-white mt-2">
            <CardExpiryElement options={cardElementOptions} />
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            CVC
          </Label>
          <div className="p-4 border border-gray-300 rounded-lg bg-white mt-2">
            <CardCvcElement options={cardElementOptions} />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Event Activation</span>
          <span className="font-semibold text-gray-900">$20.00</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-gray-900">$20.00</span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        {processing ? 'Processing...' : 'Pay $20.00'}
      </Button>

      <div className="flex items-center justify-center text-sm text-gray-500">
        <Lock className="h-4 w-4 mr-2" />
        Secured by Stripe
      </div>
    </form>
  );
};

const Payment = ({ isModal = false, eventId: propEventId, eventName: propEventName, onClose }) => {
  const { id: paramEventId } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  
  const eventId = propEventId || paramEventId;
  const eventName = propEventName || 'Event';
  
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId && token) {
      createPaymentIntent();
    }
  }, [eventId, token]);

  const createPaymentIntent = async () => {
    try {
      const response = await axios.post(
        `${API}/payments/create-payment-intent/${eventId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setClientSecret(response.data.client_secret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize payment',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    if (isModal && onClose) {
      onClose(true); // Pass true to indicate success
    } else {
      router.push(`/event/${eventId}`);
    }
  };

  const handleClose = () => {
    if (isModal && onClose) {
      onClose(false);
    } else {
      router.push(`/event/${eventId}`);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${isModal ? 'py-12' : 'min-h-screen bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const content = (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Activate Event</h2>
            <p className="text-gray-600 text-sm">{eventName}</p>
          </div>
        </div>
        {isModal && (
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            clientSecret={clientSecret}
            eventName={eventName}
            eventId={eventId}
            onSuccess={handleSuccess}
          />
        </Elements>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Your payment information is secure and encrypted.</p>
      </div>
    </>
  );

  // Modal view
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  // Full page view
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {!isModal && (
          <Button
            variant="ghost"
            onClick={handleClose}
            className="mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Event
          </Button>
        )}

        <Card className="p-8 bg-white shadow-xl">
          {content}
        </Card>
      </div>
    </div>
  );
};

export default Payment;