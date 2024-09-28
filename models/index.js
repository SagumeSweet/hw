const User = require('./User');
const Follow = require('./Follow');
const Subscription = require('./Subscription');
const Favorite = require('./Favorite');
const Content = require('./Content');
const PaymentAccount = require('./PaymentAccount');
const PaymentOrder = require('./PaymentOrder');
const TransactionRecord = require('./TransactionRecord');

// 定义关系
User.hasMany(Follow, { foreignKey: 'user_id' });
User.hasMany(Subscription, { foreignKey: 'user_id' });
User.hasMany(Favorite, { foreignKey: 'user_id' });
User.hasMany(Content, { foreignKey: 'creator_id' });
User.hasMany(PaymentAccount, { foreignKey: 'user_id' });
User.hasMany(PaymentOrder, { foreignKey: 'user_id' });
User.hasMany(TransactionRecord, { foreignKey: 'user_id' });

Follow.belongsTo(User, { foreignKey: 'user_id' });
Follow.belongsTo(User, { foreignKey: 'creator_id' });

Subscription.belongsTo(User, { foreignKey: 'user_id' });
Subscription.belongsTo(User, { foreignKey: 'creator_id' });

Favorite.belongsTo(User, { foreignKey: 'user_id' });
Favorite.belongsTo(Content, { foreignKey: 'contentId' });

Content.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });

PaymentOrder.belongsTo(User, { foreignKey: 'user_id' });
PaymentOrder.belongsTo(User, { foreignKey: 'creator_id' });
PaymentOrder.belongsTo(PaymentAccount, { foreignKey: 'payment_account_id' });

TransactionRecord.belongsTo(User, { foreignKey: 'user_id' });

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
