"use strict";

module.exports = async ({ strapi }) => {
  // Set permissions for Menu API on bootstrap
  const actions = [
    "api::menu.menu.find",
    "api::menu.menu.findOne", 
    "api::menu.menu.create",
    "api::menu.menu.update",
    "api::menu.menu.delete",
  ];

  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (publicRole) {
    for (const action of actions) {
      const permission = await strapi
        .query("plugin::users-permissions.permission")
        .findOne({
          where: {
            action: action,
            role: publicRole.id,
          },
        });

      if (!permission) {
        await strapi.query("plugin::users-permissions.permission").create({
          data: {
            action: action,
            role: publicRole.id,
          },
        });
      }
    }
    
    strapi.log.info("Menu API permissions set for public role");
  }
};
