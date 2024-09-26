const User = require('./User');
const Follow = require('./Follow');
const Subscription = require('./Subscription');
const Favorite = require('./Favorite');
const Content = require('./Content');
const PaymentAccount = require('./PaymentAccount');
const PaymentOrder = require('./PaymentOrder');
const TransactionRecord = require('./TransactionRecord');

// 定义关系
User.hasMany(Follow, { foreignKey: 'userId' });
User.hasMany(Subscription, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });
User.hasMany(Content, { foreignKey: 'creatorId' });
User.hasMany(PaymentAccount, { foreignKey: 'userId' });
User.hasMany(PaymentOrder, { foreignKey: 'userId' });
User.hasMany(TransactionRecord, { foreignKey: 'userId' });

Follow.belongsTo(User, { foreignKey: 'userId' });
Follow.belongsTo(User, { foreignKey: 'creatorId' });

Subscription.belongsTo(User, { foreignKey: 'userId' });
Subscription.belongsTo(User, { foreignKey: 'creatorId' });

Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Content, { foreignKey: 'contentId' });

Content.belongsTo(User, { foreignKey: 'creatorId' });

PaymentOrder.belongsTo(User, { foreignKey: 'userId' });
PaymentOrder.belongsTo(User, { foreignKey: 'creatorId' });
PaymentOrder.belongsTo(PaymentAccount, { foreignKey: 'paymentAccountId' });

TransactionRecord.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Follow,
    Subscription,
    Favorite,
    Content,
    PaymentAccount,
    PaymentOrder,
    TransactionRecord,
};
