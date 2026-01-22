"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     */
    register( /* { strapi }: { strapi: Core.Strapi } */) { },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * Set up permissions for Menu API
     */
    async bootstrap({ strapi }) {
        // Set permissions for Menu API on bootstrap
        const actions = [
            "api::menu.menu.find",
            "api::menu.menu.findOne",
            "api::menu.menu.create",
            "api::menu.menu.update",
            "api::menu.menu.delete",
        ];
        try {
            // Find both Public and Authenticated roles
            const roles = await strapi
                .query("plugin::users-permissions.role")
                .findMany({
                where: {
                    type: {
                        $in: ["public", "authenticated"]
                    }
                }
            });
            for (const role of roles) {
                strapi.log.info(`Configuring Menu API permissions for role: ${role.type}`);
                for (const action of actions) {
                    const existingPermission = await strapi
                        .query("plugin::users-permissions.permission")
                        .findOne({
                        where: {
                            action: action,
                            role: role.id,
                        },
                    });
                    if (!existingPermission) {
                        await strapi.query("plugin::users-permissions.permission").create({
                            data: {
                                action: action,
                                role: role.id,
                            },
                        });
                        strapi.log.info(`Granted ${action} to ${role.type}`);
                    }
                }
            }
            strapi.log.info("✅ Menu API permissions configured for access");
        }
        catch (error) {
            strapi.log.error("Error setting Menu API permissions:", error);
        }
    },
};
