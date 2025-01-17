import { CourseSectionStepType } from '@/services/API';

import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

export const StepTypeIcons = {
  [CourseSectionStepType.VIDEO]: <MovieRoundedIcon />,
  [CourseSectionStepType.TEST]: <DescriptionRoundedIcon />,
};
