const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("remove_warn")
      .setDescription("🧹 Removes all warnings for a user.")
      .addUserOption(option => option.setName("user").setDescription("The user to remove warnings from.").setRequired(true)),

    async execute(client, interaction) {
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")){
return interaction.reply({ content: "**:x: You don't have permission to use this command.**", ephemeral: true });
}
      const user = interaction.options.getUser("user");

      const warnsFilePath = './warns.json';

      if (!fs.existsSync(warnsFilePath)) {
        return interaction.reply({ content: `⚠️ **There are no warnings data to remove.**` });
      }

      const warnsData = JSON.parse(fs.readFileSync(warnsFilePath, 'utf-8'));

      if (!warnsData[user.id] || warnsData[user.id].length === 0) {
        return interaction.reply({ content: `⚠️ **${user.username} does not have any warnings.**` });
      }

      delete warnsData[user.id];

      fs.writeFileSync(warnsFilePath, JSON.stringify(warnsData, null, 2), 'utf-8');

      return interaction.reply({ content: `✅ **All warnings for ${user.username} have been removed!**` });
    
  },
}