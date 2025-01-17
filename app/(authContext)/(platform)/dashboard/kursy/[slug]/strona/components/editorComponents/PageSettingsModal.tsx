import Modal from '@/components/materialUI/Modal';
import Select from '@/components/materialUI/Select';
import { useModal } from '@/hooks/useModal';
import { Box, IconButton, List } from '@mui/material';
import React, { useState } from 'react';
import PageSettingsSeoView from './pageSettingsViews/PageSettingsSeoView';
import PageSettingsIntegrationsView from './pageSettingsViews/PageSettingsIntegrationsView';
import Button from '@/components/materialUI/Button';
import PageSettingsDomainView from './pageSettingsViews/PageSettingsDomainView';
import SettingsIcon from '@mui/icons-material/Settings';

enum SettingsViews {
  SEO = 'SEO',
  INTEGRATIONS = 'INTEGRATIONS',
  DOMAIN = 'DOMAIN',
}

const PageSettingsModal = () => {
  const [isModalOpen, toggleModal] = useModal();
  const [currentView, setCurrentView] = useState(SettingsViews.SEO);

  const sideBarLinks = [
    {
      title: 'SEO',
      value: SettingsViews.SEO,
    },
    {
      title: 'Integracje',
      value: SettingsViews.INTEGRATIONS,
    },
    {
      title: 'Domena',
      value: SettingsViews.DOMAIN,
    },
  ];

  const handleChangePage = (value: SettingsViews) => {
    setCurrentView(value);
  };

  const getSettingsView = () => {
    switch (currentView) {
      case SettingsViews.SEO:
        return <PageSettingsSeoView />;
      case SettingsViews.DOMAIN:
        return <PageSettingsDomainView />;
      case SettingsViews.INTEGRATIONS:
        return <PageSettingsIntegrationsView />;
    }
  };

  return (
    <>
      <IconButton onClick={toggleModal} className="-tw-ml-2">
        <SettingsIcon />
      </IconButton>
      <Modal
        maxWidth="lg"
        open={isModalOpen}
        onClose={toggleModal}
        title="Ustawienia strony"
      >
        <Box className="tw-flex tw-flex-col">
          <Box className="md:tw-hidden">
            <Select
              id="view"
              name="view"
              value={currentView}
              items={sideBarLinks}
              onChange={(e) =>
                handleChangePage(e.target.value as SettingsViews)
              }
            />
          </Box>
          <Box className="tw-grid md:tw-grid-cols-12 tw-gap-4">
            <Box
              sx={{
                borderRight: '1px solid',
                borderImageSlice: 1,
                borderImageSource:
                  'linear-gradient(180deg, #3F3846 0%, #1A151F 100%)',
              }}
              className="tw-hidden md:tw-flex md:tw-flex-col md:tw-col-span-3 tw-pr-4"
            >
              <List
                classes={{
                  root: 'tw-flex tw-flex-col tw-space-y-2',
                }}
              >
                {sideBarLinks.map((link) => (
                  <Button
                    key={link.value}
                    primary={currentView === link.value}
                    onClick={() => handleChangePage(link.value)}
                  >
                    {link.title}
                  </Button>
                ))}
              </List>
            </Box>
            <Box className="tw-mt-4 md:tw-mt-0 md:tw-col-span-9 tw-flex tw-flex-col">
              {getSettingsView()}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PageSettingsModal;
