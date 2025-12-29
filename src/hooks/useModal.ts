import Swal, { type SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCallback } from "react";

export const useSwalModal = () => {
  const MySwal = withReactContent(Swal);
  const showModal = useCallback(
    (modalOptions: SweetAlertOptions) => {
      return MySwal.fire({
        ...modalOptions,
      });
    },
    [MySwal],
  );

  return { showModal };
};
