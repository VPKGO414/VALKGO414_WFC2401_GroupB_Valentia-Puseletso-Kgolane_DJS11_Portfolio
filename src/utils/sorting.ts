interface Sortable {
    title: string;
    updatedAt?: Date;
  }
  
  export const sortByTitleAZ = (items: Sortable[]) => {
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  };
  
  export const sortByTitleZA = (items: Sortable[]) => {
    return [...items].sort((a, b) => b.title.localeCompare(a.title));
  };
  
  export const sortByDateNewest = (items: Sortable[]) => {
    return [...items].sort((a, b) => {
      if (a.updatedAt && b.updatedAt) {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
      return 0;
    });
  };
  
  export const sortByDateOldest = (items: Sortable[]) => {
    return [...items].sort((a, b) => {
      if (a.updatedAt && b.updatedAt) {
        return a.updatedAt.getTime() - b.updatedAt.getTime();
      }
      return 0;
    });
  };
  