import toast from 'react-hot-toast';
import dataJSON from '../../public/data.json';

interface DataItem {
  [key: string]: number | string | undefined;
}

interface AlertSetting {
  id: string;
  value: string | number;
  para: string;
  criterion: number;
  type: number;
}

const createToast = (title: string, msg: string, type: number) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      }
      max-w-md w-full ${type === 0 ? "bg-[#04b20c]" : type === 1 ? "bg-[#eab90f]" : "bg-[#e13f32]"} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4 ">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">
              {title}
            </p>
            <p className="mt-1 text-sm text-white">
              {msg}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          type="button"
          className="mr-2 box-content rounded-none border-none opacity-100 hover:no-underline hover:opacity-50 focus:opacity-50 focus:shadow-none focus:outline-none text-white"
          data-te-toast-dismiss
          aria-label="Close">
          <span
            className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  ));
};

const evaluateCondition = (alertSetting: AlertSetting, value: number): boolean => {
  switch (alertSetting.criterion) {
    case 0:
      return parseFloat(alertSetting.value.toString()) <= -value;
    case 1:
    case 3:
      return parseFloat(alertSetting.value.toString()) >= value;
    case 2:
      return parseFloat(alertSetting.value.toString()) <= value;
    default:
      return false;
  }
}

const getCriterionDescription = (criterion: number): string => {
  switch (criterion) {
    case 0:
      return "goes down by";
    case 1:
      return "goes up by";
    case 2:
      return "is smaller than";
    case 3:
      return "is greater than";
    default:
      return "is equal to";
  }
}

const fireToast = () => {
  const alertSettingsStr = localStorage.getItem("alertSettings");
  if (alertSettingsStr) {
    const alertSettings: { [key: string]: AlertSetting } = JSON.parse(alertSettingsStr);
    Object.values(alertSettings).forEach(alertSetting => {
      if (alertSetting.id === "ALL") {
        Object.entries<DataItem>(dataJSON).forEach(([id, value]) => {
          const condition = evaluateCondition(alertSetting, typeof value[alertSetting.para] === "number" ? value[alertSetting.para] as number : parseFloat(value[alertSetting.para]?.toString() || '0'));
          if (condition) {
            const realValue = alertSetting.criterion === 0 ? value[alertSetting.para] as number * -1 : value[alertSetting.para] as number;
            const msg = `${alertSetting.para} of ${id} ${getCriterionDescription(alertSetting.criterion)} ${realValue}`;
            createToast(id, msg, alertSetting.type);
          }
        });
      } else {
        const value = (dataJSON as { [key: string]: DataItem })[alertSetting.id]?.[alertSetting.para];
        if (value !== undefined) {
          const condition = evaluateCondition(alertSetting, typeof value === "number" ? value as number : parseFloat(value?.toString() || '0'));
          if (condition) {
            const realValue = alertSetting.criterion === 0 ? value as number * -1 : value as number;
            const msg = `${alertSetting.para} of ${alertSetting.id} ${getCriterionDescription(alertSetting.criterion)} ${realValue}`;
            createToast(alertSetting.id, msg, alertSetting.type);
          }
        }
      }
    });
  }
}

export default fireToast;
