"use client";

import React, { useEffect, useState } from "react";
import { INITIAL_MONTHLY_ROOM_INVOICE } from "@/initials/RentalRoom.initial";
import { MonthlyRoomInvoiceType } from "@/types/RentalRoom.type";
import { useRouter } from "next/navigation";
import { MonthlyRoomInvoiceForm } from "./MonthlyRoomInvoiceForm";
import { toastError, toastSuccess } from "@/lib/client/alert";
import { MonthlyRoomInvoiceMessage } from "@/messages/RentalRoom.message";
import { AxiosError } from "axios";
import { GeneralMessage } from "@/messages/General.message";
import { monthlyRoomInvoiceService } from "@/services/RentalRoom.service";
import { NOT_FOUND_URL } from "@/lib/client/notFoundURL";
import { Loading } from "@/components/partial/data/Loading";

type MonthlyRoomInvoiceEditProps = {
  roomId: string;
  roomCodeId: string;
  id: string;
};

export const MonthlyRoomInvoiceEdit = (props: MonthlyRoomInvoiceEditProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<MonthlyRoomInvoiceType>(
    INITIAL_MONTHLY_ROOM_INVOICE
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await monthlyRoomInvoiceService.get(props.id);
        setReqData(data);
      } catch {
        router.push(NOT_FOUND_URL);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.id, router]);

  const handlePatchError = async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      await toastError(GeneralMessage.UNKNOWN_ERROR);
      return;
    }

    await toastError(MonthlyRoomInvoiceMessage.PATCH_ERROR);
  };

  const patchData = async (actionAfter?: () => void) => {
    try {
      await monthlyRoomInvoiceService.patch(props.id, reqData);
      await toastSuccess(MonthlyRoomInvoiceMessage.PATCH_SUCCESS);
      actionAfter?.();
    } catch (error) {
      await handlePatchError(error);
    }
  };

  const saveOnClick = async () => {
    await patchData();
  };

  const saveAndExitOnClick = async () => {
    await patchData(() => {
      router.push(
        `/rental-rooms/${props.roomId}/room-codes/${props.roomCodeId}`
      );
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <MonthlyRoomInvoiceForm
      formLabel="Cập nhật hóa đơn tiền trọ hằng tháng"
      mode="edit"
      roomCodeId={props.roomCodeId}
      roomId={props.roomId}
      reqData={reqData}
      setReqData={setReqData}
      saveOnClick={saveOnClick}
      saveAndExitOnClick={saveAndExitOnClick}
    />
  );
};
