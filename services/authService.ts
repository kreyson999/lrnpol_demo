import { UserGroup } from '@/constants/enums';
import { AuthenticatedUser } from '@/constants/types';
import { sendGAEvent } from '@next/third-parties/google';
import {
  signUp,
  signIn,
  signOut,
  fetchUserAttributes,
  autoSignIn,
  resetPassword,
  confirmResetPassword,
  fetchAuthSession,
} from 'aws-amplify/auth';

type SignUpParameters = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

type SignInParameters = {
  password: string;
  email: string;
};

export const AuthService = {
  signUp: ({ firstName, lastName, password, email }: SignUpParameters) => {
    return new Promise<'AUTO_SIGN_IN_SUCCESS' | 'AUTO_SIGN_IN_FAILURE'>(
      (resolve, reject) => {
        signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              given_name: firstName,
              family_name: lastName,
            },
            autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
          },
        })
          .then(() => {
            sendGAEvent('event', 'register', { event: 'register' });
            autoSignIn()
              .then(() => {
                resolve('AUTO_SIGN_IN_SUCCESS');
              })
              .catch((error) => {
                console.error(error);
                resolve('AUTO_SIGN_IN_FAILURE');
              });
          })
          .catch((error: Error & { name: string }) => {
            console.dir(error);

            switch (error.name) {
              case 'InvalidPasswordException':
                reject(
                  'Nie udało się stworzyć konto, ponieważ Twoje hasło jest za proste.'
                );
                break;
              case 'UsernameExistsException':
                reject(
                  'Na ten adres e-mail jest już stworzone konto. Upewnij się, że nie logowałeś się do platformy learnpool.pl przy okazji zakupu innego kursu!'
                );
                break;
              default:
                reject(`Wystąpił nieznany błąd przy logowaniu: ${error.name}`);
                break;
            }
          });
      }
    );
  },
  signIn: ({ password, email }: SignInParameters) => {
    return new Promise<void>((resolve, reject) => {
      signIn({
        username: email,
        password,
        options: {
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      })
        .then(() => {
          sendGAEvent('event', 'login', { event: 'login' });
          resolve();
        })
        .catch((error: Error & { name: string }) => {
          console.dir(error);

          switch (error.name) {
            case 'NotAuthorizedException':
              reject('Nieprawidłowy e-mail lub hasło.');
              break;
            case 'UserNotFoundException':
              reject('Nie znaleziono takiego użytkownika.');
              break;
            case 'UserNotConfirmedException':
              reject('Twoje konto nie zostało potwierdzone.');
              break;
            default:
              reject(`Wystąpił nieznany błąd przy logowaniu: ${error.name}`);
              break;
          }
        });
    });
  },
  getCurrentAuthenticatedUser: () => {
    return new Promise<AuthenticatedUser | null>((resolve) => {
      fetchAuthSession()
        .then((response) => {
          if (response.tokens) {
            fetchUserAttributes()
              .then((userAttributesResponse) => {
                resolve({
                  id: userAttributesResponse.sub!,
                  identityId: response.identityId!,
                  email: userAttributesResponse.email!,
                  firstName: userAttributesResponse.given_name!,
                  lastName: userAttributesResponse.family_name!,
                  groups:
                    (response.tokens?.accessToken.payload[
                      'cognito:groups'
                    ] as UserGroup[]) ?? [],
                });
              })
              .catch(() => {
                resolve(null);
              });
          } else {
            resolve(null);
          }
        })
        .catch(() => {
          resolve(null);
        });
    });
  },
  signOut: () => {
    return new Promise<void>((resolve, reject) => {
      signOut()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  resetPassword: (email: string) => {
    return new Promise<void>((resolve, reject) => {
      resetPassword({ username: email })
        .then(() => {
          resolve();
        })
        .catch((error: { name: string }) => {
          console.log(error);
          switch (error.name) {
            case 'UserNotFoundException':
              reject('Konto z takim adresem e-mail nie istnieje!');
              break;
            default:
              reject(
                `Wystąpił nieznany błąd przy zmienianiu hasła: ${error.name}`
              );
              break;
          }
        });
    });
  },
  confirmResetPassword: (
    email: string,
    confirmationCode: string,
    newPassword: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      confirmResetPassword({ username: email, confirmationCode, newPassword })
        .then(() => {
          resolve();
        })
        .catch((error: { name: string }) => {
          console.log(error);
          switch (error.name) {
            case 'UserNotFoundException':
              reject('Konto z takim adresem e-mail nie istnieje!');
              break;
            default:
              reject(
                `Wystąpił nieznany błąd przy zmienianiu hasła: ${error.name}`
              );
              break;
          }
        });
    });
  },
};
