import React, { useCallback, useEffect, useState } from 'react';

import PageLoader from '@/components/shared/PageLoader';
import { CourseSubscriptionPlan as CourseSubscriptionPlanType } from '@/services/API';
import { generateClient } from 'aws-amplify/api';
import { listCourseSubscriptionPlans } from '@/services/graphql/queries';
import { useErrorState } from '@/contexts/ErrorContext';
import CreateCoursePlan from '@/components/shared/CreateCoursePlan';

const ChoosePlan = () => {
  const [plans, setPlans] = useState<CourseSubscriptionPlanType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setErrorMessage = useErrorState();

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    try {
      const client = generateClient();

      const response = await client.graphql({
        query: listCourseSubscriptionPlans,
      });

      setPlans(response.data.listCourseSubscriptionPlans.items);
    } catch (error) {
      setErrorMessage('Nie udało się pobrać planów subskrybcji kursu!');
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage]);

  useEffect(() => {
    void fetchPlans();
  }, [fetchPlans]);

  return (
    <PageLoader isLoading={isLoading}>
      {plans
        .sort((a, b) => (a.price > b.price ? 1 : -1))
        .map((plan) => (
          <CreateCoursePlan
            actionType="INITIATE_PAYMENT"
            key={plan.name}
            plan={plan}
          />
        ))}
    </PageLoader>
  );
};

export default ChoosePlan;
