import { useQuery } from '@tanstack/react-query';
import { getPortfolioData } from '../lib/api';

export function useProfileData() {
  const { data } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolioData,
    staleTime: 1000 * 60 * 10,
  });
  const profile = data?.profile;
  return {
    name:      profile?.name                  ?? 'Vigneshwar Pasupathi',
    initials:  profile?.initials              ?? 'VP',
    photoUrl:  profile?.avatarUrl             ?? '',
    tagline:   profile?.tagline               ?? '',
    roles:     profile?.roles                 ?? [],
    resumeUrl: profile?.contact.resumeUrl     ?? '',
  };
}
