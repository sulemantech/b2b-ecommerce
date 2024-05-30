// import { fetchNotificationsStart, fetchNotificationsSuccess, fetchNotificationsFailure } from './Notification-slice';

// export const fetchNotifications = (authToken) => async (dispatch) => {
//   dispatch(fetchNotificationsStart());
//   try {
//     const notificationResponse = await fetch(
//       `${process.env.REACT_APP_PUBLIC_URL}/notifications/specific`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );
//     const notifications = await notificationResponse.json();
//     dispatch(fetchNotificationsSuccess(notifications));
//   } catch (error) {
//     dispatch(fetchNotificationsFailure(error.message));
//   }
// };
