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
            if (context.authUser._id === context.authAccount.owner) {
                return fn(root, args, context);
            }
            throw new Error('User is not admin');
        };

// const createResolver = (resolver) => {
//     const baseResolver = resolver
//     baseResolver.createResolver = (childResolver) => {
//         const newResolver = async (root, args, context) => {
//             await resolver(root, args, context)
//             return childResolver(root, args, context)
//         }
//         return createResolver(newResolver)
//     }
//     return baseResolver
// }

// const requiresAuth = createResolver((root, args, context) => {
//     if (!context.authUser || !context.authUser.id) {
//         throw new Error('Not authenticated')
//     }
// })

module.exports = requiresAuth