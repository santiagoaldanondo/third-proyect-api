const createResolver = (resolver) => {
    const baseResolver = resolver
    baseResolver.createResolver = (childResolver) => {
        const newResolver = async (root, args, context) => {
            await resolver(root, args, context)
            return childResolver(root, args, context)
        }
        return createResolver(newResolver)
    }
    return baseResolver
}

const requiresAuth = createResolver((root, args, context) => {
    if (!context.authUser || !context.authUser.id) {
        throw new Error('Not authenticated')
    }
})

const requiresAccount = requiresAuth.createResolver((root, args, context) => {
    if (context.authUser.account !== args.account) {
        throw new Error('You need permissions to access this account')
    }
})

module.exports = { requiresAccount, requiresAuth }