"use client";

import {
  useEffect,
  useState,
} from "react";

export default function NotificationCenter() {
  const [
    notifications,
    setNotifications,
  ] = useState([]);

  useEffect(() => {
    const fetchNotifications =
      async () => {
        const response =
          await fetch(
            "/api/admin/notifications"
          );
        if (!response.ok) {
          throw new Error(
            "Failed request"
          );
        }

        const data =
          await response.json();

        if (
          data.success
        ) {
          setNotifications(
            data.notifications
          );
        }
      };

    fetchNotifications();
  }, []);

  const getIcon =
    (type) => {
      switch (
        type
      ) {
        case "approval":
          return "📝";

        case "fees":
          return "💰";

        case "attendance":
          return "📉";

        case "performance":
          return "📚";

        default:
          return "🔔";
      }
    };

  return (
    <div className="bg-white rounded-[35px] shadow-lg p-8 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="heading-font text-3xl font-bold text-[#163232]">
          Notifications
        </h2>

        <span className="bg-[#3ED6C1] text-white px-4 py-2 rounded-full font-semibold">
          {
            notifications.length
          }
        </span>
      </div>

      {notifications
        .length ===
      0 ? (
        <div className="text-center py-10 text-gray-500">
          No notifications
        </div>
      ) : (
        <div className="space-y-4">

          {notifications
            .slice(
              0,
              10
            )
            .map(
              (
                notification,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="border rounded-[25px] p-5 flex gap-4 items-start"
                >
                  <div className="text-3xl">
                    {getIcon(
                      notification.type
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-[#163232]">
                      {
                        notification.title
                      }
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {
                        notification.message
                      }
                    </p>
                  </div>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
}