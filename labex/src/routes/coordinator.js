export const goToHomePage = (history) => {
  history.push("/");
};

export const goToAdminHomePage = (history) => {
  history.push("/admin/trips/list");
};

export const goToApplicationFormPage = (history) => {
  history.push("/ApplicationFormPage");
};

export const goToCreateTripPage = (history) => {
  history.push("/admin/trips/create");
};

export const goToListTripsPage = (history) => {
  history.push("/ListTripsPage");
};

export const goToLoginPage = (history) => {
  history.push("/LoginPage");
};

export const goToTripsDetailsPage = (history, id) => {
  history.push(`/admin/trips/${id}`);
};
