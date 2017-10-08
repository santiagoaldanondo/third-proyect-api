const requiresAuth =
    (fn) =>
        (root, args, context) => {
            if (context.authUser) {
                return fn(root, args, context);
            }
            throw new Error('User is not authenticated');
        };

const requiresAdmin =
    (fn) =>
        (root, args, context) => {
            if (context.authUser._id === context.authAccount.owner || context.authUser.isAdmin) {
                return fn(root, args, context);
            }
            throw new Error('User is not admin');
        };

module.exports = { requiresAuth, requiresAdmin }