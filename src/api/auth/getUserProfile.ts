import { isBrowserEnv } from '@/utils';
import { createClient } from '@/libs/supabase/client';
import { createClient as createServerClient } from '@/libs/supabase/server';
import { errorMessages } from '@/constants/api';
import { AuthErrorCode } from '@/types/supabase';
import { AuthStoreState } from '@/types';

type Error = {
  code: string;
  message: string;
};

type GetUserProfile = () => Promise<
  | { success: false; error: Error }
  | {
      success: true;
      data: AuthStoreState['user'];
    }
>;

const getUserProfile: GetUserProfile = async () => {
  const isBrowser = isBrowserEnv();
  const supabase = isBrowser ? createClient() : await createServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return {
      success: false,
      error: {
        code: error.code as string,
        message:
          errorMessages.auth[error.code as AuthErrorCode] ||
          (error.code as string),
      },
    };
  }

  return {
    success: true,
    data: {
      id: data.user.id,
      username: data.user.user_metadata.username ?? '',
      email: data.user.email as string,
      avatar_url: data.user.user_metadata.avatar_url ?? '',
      provider: data.user.app_metadata.provider ?? '',
      last_login_at: data.user.last_sign_in_at ?? '',
    },
  };
};

export default getUserProfile;
