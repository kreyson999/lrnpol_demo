import { useState } from 'react';
import { SnackbarVariant } from '@/constants/enums';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const useSnackbar = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [variant, setVariant] = useState<SnackbarVariant>(
    SnackbarVariant.SUCCESS
  );

  const showSnackbar = (message: string, variant?: SnackbarVariant) => {
    setMessage(message);
    if (!variant) return;
    setVariant(variant);
  };

  const onClose = () => {
    setMessage(null);
    setVariant(SnackbarVariant.SUCCESS);
  };

  const SnackbarComponent = (
    <Snackbar
      open={message ? true : false}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={variant} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};
