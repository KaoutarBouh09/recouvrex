import axios from 'src/config/axiosConfig'; // <-- your instance

export const createPaymentPlan = (data, initiatorId) => {
  return axios.post(`/payment-plan/?initiatorId=${initiatorId}`, data);
};

export const getPaymentPlansByCase = (caseId) => {
  return axios.get(`/payment-plan/getPaymentPlans?caseId=${caseId}`);
};

export const getPendingPlans = (managerId) => {
  return axios.get(`/payment-plan/getPaymentPlans?managerId=${managerId}`);
};

export const validatePlan = (id, validatorId, comment) => {
  return axios.put(
    `/payment-plan/validate/${id}?validatorId=${validatorId}`,
    { comment }
  );
};

export const rejectPlan = (id, validatorId, reason) => {
  return axios.put(
    `/payment-plan/reject/${id}?validatorId=${validatorId}`,
    { reason }
  );
};

export const downloadPdf = (id) => {
  return axios.get(`/payment-plan/download-pdf/${id}`, {
    responseType: "blob",
  });
};