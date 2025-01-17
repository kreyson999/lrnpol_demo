'use client';

import React, { useCallback, useEffect, useState } from 'react';
import MContainer from '@mui/material/Container';
import MTypography from '@mui/material/Typography';
import MBox from '@mui/material/Box';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import axios from 'axios';
import { useParams } from 'next/navigation';
import TextInput from '@/components/materialUI/TextInput';
import { UserOrder } from '@/services/API';
import { useErrorState } from '@/contexts/ErrorContext';
import PageLoader from '@/components/shared/PageLoader';

const AnalyticsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [startDate, setStartDate] = useState(
    dayjs().subtract(1, 'month').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const setErrorMessage = useErrorState();

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ orders: UserOrder[] }>(
        `/api/courses/${slug}/purchases?startDate=${startDate}&endDate=${endDate}`
      );
      setOrders(response.data.orders);
    } catch (error) {
      setErrorMessage('Nie udało się pobrać kursów!');
    } finally {
      setIsLoading(false);
    }
  }, [endDate, startDate, slug, setErrorMessage]);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  // Przygotowanie danych do wykresu
  const prepareChartData = () => {
    const groupedOrders = orders.reduce((acc, order) => {
      const date = dayjs(order.updatedAt).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dates = Object.keys(groupedOrders).sort();
    return {
      xAxis: dates.map((date) => dayjs(date).format('DD.MM')),
      yAxis: dates.map((date) => groupedOrders[date]),
    };
  };

  const chartData = prepareChartData();

  return (
    <MContainer maxWidth="lg" className="tw-py-8">
      <MBox className="tw-flex tw-gap-4 tw-mb-6">
        <TextInput
          id="startDate"
          type="date"
          label="Data początkowa"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextInput
          id="endDate"
          type="date"
          label="Data końcowa"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </MBox>

      <PageLoader isLoading={isLoading}>
        <MBox className="tw-bg-background-paper tw-p-6 tw-rounded-lg tw-mb-6">
          <MTypography variant="h6" className="tw-mb-4">
            Sprzedaż w wybranym okresie: {orders.length} kursów
          </MTypography>
          <MTypography>
            Łączna wartość:{' '}
            {orders.reduce((sum, order) => sum + Number(order.price), 0)} zł
          </MTypography>
          <MTypography className="tw-mb-4 tw-text-sm tw-text-red-500">
            Finalna kwota zostanie pomniejszona o prowizję platformy oraz
            prowizję operatora płatności (~7%)
          </MTypography>

          {orders.length > 0 && (
            <LineChart
              xAxis={[
                {
                  data: chartData.xAxis,
                  scaleType: 'band',
                  tickLabelStyle: {
                    fill: '#FFFFFF',
                  },
                },
              ]}
              yAxis={[
                {
                  tickLabelStyle: {
                    fill: '#FFFFFF',
                  },
                },
              ]}
              series={[
                {
                  data: chartData.yAxis,
                  area: false,
                  color: '#9022FF',
                },
              ]}
              height={300}
            />
          )}
        </MBox>

        <MBox className="tw-bg-background-paper tw-p-6 tw-rounded-lg">
          <MTypography variant="h6" className="tw-mb-4">
            Lista zamówień
          </MTypography>

          <div className="tw-space-y-4">
            {orders
              .sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1))
              .map((order) => (
                <div
                  key={order.id}
                  className="tw-bg-background-default tw-flex tw-justify-between tw-items-center tw-p-4 tw-border tw-border-primary-light tw-rounded-lg"
                >
                  <div>
                    <MTypography>Id użytkownika: {order.owner}</MTypography>
                    <MTypography className="tw-text-sm tw-text-secondary-contrastText">
                      Data: {dayjs(order.updatedAt).format('DD.MM.YYYY HH:mm')}
                    </MTypography>
                  </div>
                  <MTypography className="tw-font-bold">
                    {order.price} zł
                  </MTypography>
                </div>
              ))}
          </div>
        </MBox>
      </PageLoader>
    </MContainer>
  );
};

export default AnalyticsPage;
