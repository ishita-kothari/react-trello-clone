export const getDateTime = (date) => {
  const dateTime = new Date(date);
  const dateD = dateTime.getDate();
  const month = dateTime.getMonth();
  const fullYear = dateTime.getFullYear();
  const hours = dateTime.getHours().toString().length < 2 ? `0${dateTime.getHours()}` : dateTime.getHours();
  const minutes = dateTime.getMinutes().toString().length < 2 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes();
  return `${dateD}/${month}/${fullYear}, ${hours}:${minutes}`;
};

const getTimestamp = () => {
  const date = new Date();
  return date.getTime();
};

export const updateData = (list, data) => {
  let newId = list.length;
  data["id"] = newId;
  data["updateTime"] = getTimestamp();
  const newData = [...list, data];
  return newData;
};

export const updateCardList = (list, data, listId) => {
  let newId = list.filter((i) => i.id === listId)[0].cards.length;
  data["id"] = `${listId} - ${newId}`;
  data["updateTime"] = getTimestamp();
  const newData = list.map((i) => {
    if (i.id === listId) {
      return {
        ...i,
        cards: [...i.cards, data],
      };
    } else {
      return i;
    }
  });
  return newData;
};

export const updateCardTitle = (store, data, listId, cardId) => {
  const list = store.get("list");
  const filteredList = list.filter((i) => i.id === listId)[0];
  const newData = filteredList.cards.map((i) => {
    if (i.id === cardId) {
      return {
        ...i,
        desc: data,
      };
    } else {
      return i;
    }
  });
  const newList = list.map((i) => {
    if (i.id === listId) {
      return {
        ...i,
        cards: newData,
      };
    } else {
      return i;
    }
  });
  store.set("list", newList);
};

export const shiftCardPosition = (
  storage,
  selectedListId,
  cardId,
  parentId
) => {
  const list = storage.get("list");
  const filteredCard = list
    .filter((i) => i.id === parentId)[0]
    .cards.filter((i) => i.id === cardId);
  const newList = list.map((i) => {
    if (i.id === parentId) {
      return {
        ...i,
        cards: i.cards.filter((j) => j.id !== cardId),
      };
    } else if (i.id === selectedListId) {
      return {
        ...i,
        cards: [...i.cards, ...filteredCard],
      };
    } else {
      return i;
    }
  });
  storage.set("list", newList);
};

export const addComments = (comment, cardId, storage) => {
  const list = storage.get("list");
  const newList = list.map((i) => {
    return {
      ...i,
      cards: i.cards.map((j) => {
        if (j.id === cardId) {
          return {
            ...j,
            comments: j.comments ? [...j.comments, comment] : [comment],
          };
        } else {
          return j;
        }
      }),
    };
  });
  storage.set("list", newList);
};

export const addLabel = (label, cardId, storage) => {
  const list = storage.get("list");
  const newList = list.map((i) => {
    return {
      ...i,
      cards: i.cards.map((j) => {
        if (j.id === cardId) {
          return {
            ...j,
            labels: j.labels ? [...j.labels, label] : [label],
          };
        } else {
          return j;
        }
      }),
    };
  });
  storage.set("list", newList);
};

export const removeLabel = (label, cardId, storage) => {
  const list = storage.get("list");
  const newList = list.map((i) => {
    return {
      ...i,
      cards: i.cards.map((j) => {
        if (j.id === cardId) {
          return {
            ...j,
            labels: j.labels && j.labels.filter((i) => i !== label),
          };
        } else {
          return j;
        }
      }),
    };
  });
  storage.set("list", newList);
};

export const deleteList = (listId, storage) => {
  const list = storage.get("list");
  const newList = list.filter((i) => i.id !== listId);
  storage.set("list", newList);
};

export const sortCards = (storage, type, listId) => {
  const list = storage.get("list");

  const newList = list.map((i) => {
    if (i.id === listId) {
      return {
        ...i,
        cards: i.cards.sort(function (x, y) {
          if (type === "asc") {
            return y.updateTime - x.updateTime;
          } else {
            return x.updateTime - y.updateTime;
          }
        }),
      };
    } else {
      return i;
    }
  });
  storage.set("list", newList);
};
