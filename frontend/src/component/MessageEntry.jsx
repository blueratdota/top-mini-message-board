import { formatDistance } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useRef, useState } from "react";

const MessageEntry = ({ messageData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = messageData.post_time;
  const posted = formatDistance(date, new Date(), { addSuffix: true });
  const dialogRef = useRef(null);

  const handleOpen = () => {
    if (!isOpen) {
      dialogRef.current.showModal();
      setIsOpen(true);
    }
  };
  const handleClose = () => {
    console.log("close");
    if (isOpen) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };
  const handleClickOutside = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      handleClose();
    }
  };

  return (
    <div
      key={messageData.id}
      className="bg-extPurple rounded-lg p-4"
      onClick={handleOpen}
    >
      <p className="text-2xl truncate">{messageData.content}</p>
      <div className="mt-4 sm:flex justify-between">
        <p>
          Posted by: <span className="font-bold">{messageData.author}</span>
        </p>
        <p>{posted}</p>
      </div>
      <dialog
        ref={dialogRef}
        onClick={handleClickOutside}
        className="w-[40vw] pb-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none bg-extGray "
      >
        <p className=" text-extWhite h-full p-10">{messageData.content}</p>
      </dialog>
    </div>
  );
};
export default MessageEntry;
