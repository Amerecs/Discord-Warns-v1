const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("⚠️ Warns a member.")
    .addUserOption(option => option.setName("user").setDescription("The user to warn.").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Reason of the warn.").setRequired(false)),
  
  async execute(client, interaction) {
      if(!interaction.member.permissions.has("MANAGE_MESSAGES")){
return interaction.reply({ content: "**:x: You don't have permission to use this command.**", ephemeral: true });
}
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    if (!reason) {
      return interaction.reply({ content: `:rolling_eyes: - **Please specify a reason.**` });
    }

    const embed = new EmbedBuilder()
      .setTitle("**⚠️ You have been warned!**")
      .setDescription(reason)
      .setColor("#FFA500")
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ extension: 'png' })
      })
      .setTimestamp();

    user.send({ embeds: [embed] });

    interaction.reply({ content: `✅ **تم تحذير ${user.username}!**` });

    const warnsFilePath = './warns.json';

    if (!fs.existsSync(warnsFilePath)) {
      fs.writeFileSync(warnsFilePath, JSON.stringify({}), 'utf-8');
    }

    const warnsData = JSON.parse(fs.readFileSync(warnsFilePath, 'utf-8'));

    if (!warnsData[user.id]) {
      warnsData[user.id] = [];
    }

    warnsData[user.id].push({
      reason: reason,
      date: new Date().toISOString(),
    });

    fs.writeFileSync(warnsFilePath, JSON.stringify(warnsData, null, 2), 'utf-8');
  },
};
