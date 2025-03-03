import { useState, useEffect } from 'react';

export const useDeliveryCalculator = (order) => {
  const [progress, setProgress] = useState(0);
  const [deliveryPhase, setDeliveryPhase] = useState("Preparing");
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!order) return;

    if (order.status === "Delivered") {
      setProgress(100);
      setDeliveryPhase("Delivered");
      setTimeRemaining(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5 >= 100 ? 100 : prev + 5;

        if (newProgress >= 100) {
          setDeliveryPhase("Delivered");
        } else if (newProgress >= 70) {
          setDeliveryPhase("Out for Delivery");
        } else if (newProgress >= 30) {
          setDeliveryPhase("In Transit");
        } else {
          setDeliveryPhase("Preparing");
        }

        const remaining = Math.ceil(((100 - newProgress) / 100) * order.estimatedTime);
        setTimeRemaining(remaining);

        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [order]);

  const calculateDeliveryBreakdown = () => {
    if (!order?.estimatedTime) return { prepTime: 0, transitTime: 0 };
    
    return {
      prepTime: Math.floor(order.estimatedTime * 0.3),
      transitTime: Math.floor(order.estimatedTime * 0.7)
    };
  };

  return {
    progress,
    deliveryPhase,
    timeRemaining,
    calculateDeliveryBreakdown,
  };
};
