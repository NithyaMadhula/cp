const rules = {
  visitor: {
    static: ['homepage:visit', 'navigation:hide']
  },
  client: {
    static: ['homepage:visit', 'dashboard:visit', 'navigation:show']
  },
  administrator: {
    static: ['homepage:visit', 'dashboard:visit', 'navigation:show']
  },
  concept: {
    static: ['datachart:hide']
  },
  customerCodeMatch: {
    static: ['gameAnalytics:show']
  }
};

export default rules;
