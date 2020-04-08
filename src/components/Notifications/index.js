import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { FiBell } from "react-icons/fi";
import { parseISO, formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";

import api from "../../services/api";

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from "./styles";

export default function Notifications() {
  const user = useSelector((state) => state.user.user);
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find((notification) => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get(`notifications/${user.id}`);

      const data = response.data.map((notification) => ({
        ...notification,
        timeDistance: formatRelative(
          parseISO(notification.created_at),
          new Date(),
          { addSuffix: true, locale: ptBR }
        ),
      }));

      setNotifications(data);
    }
    loadNotifications();
  }, [user]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <FiBell color="#C71645" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map((notification) => (
            <Notification key={notification.id} unread={!notification.read}>
              <p>{notification.message}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
