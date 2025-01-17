/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // Automatycznie potwierdź użytkownika
  event.response.autoConfirmUser = true;

  // Opcjonalnie: Automatycznie zweryfikuj email użytkownika
  if (event.request.userAttributes.hasOwnProperty('email')) {
    event.response.autoVerifyEmail = true;
  }

  // Zwróć zmodyfikowany obiekt event
  return event;
};
