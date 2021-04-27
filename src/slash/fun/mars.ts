/* eslint-disable camelcase */
import { CommandInteraction } from 'discord.js';
import { NyxxEmojis, NyxxColors } from '../../../lib/Constants';
import NyxxEmbed from '../../struct/NyxxEmbed';
import NyxxFetch from '../../struct/NyxxFetch';
import Command from '../../struct/SlashCommand';

export default class SlashMarsCommand extends Command {
  constructor() {
    super('mars', {
      name: 'mars',
      description: 'Get information from the Mars 2020 Perserverance rover!',
    });
  }

  async exec(msg: CommandInteraction) {
    const embed = new NyxxEmbed(this.client, undefined, msg.user);
    const fetcher = new NyxxFetch();

    embed.setTitle(`Fetching... ${NyxxEmojis.LOADING}`);
    embed.setColor(NyxxColors.WARN);
    await msg.reply(embed);

    const weatherData = await fetcher.get<{
      sols: {
        terrestrial_date: string,
        sol: string,
        ls: string,
        season: string,
        min_temp: number,
        max_temp: number,
        pressure: number,
        sunrise: string,
        sunset: string,
      }[]
    }>('https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json');

    const roverPicture = await fetcher.get<{
      latest_photos: {
        id: number,
        sol: number,
        camera: {
          id: number,
          name: string,
          rover_id: number,
          full_name: string,
        },
        img_src: string,
        earth_date: string,
        rover: {
          id: number,
          name: string,
          landing_date: string,
          launch_date: string,
          status: string,
        }
      }[]
    }>(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${process.env.NASA_API_KEY}`);

    const randomRoverPicture = roverPicture.data.latest_photos[Math.floor(
      Math.random() * roverPicture.data.latest_photos.length,
    )];

    const weather = weatherData.data.sols[weatherData.data.sols.length - 1];

    embed.setTitle('Latest Data from Jerezo Crater');
    embed.setDescription(`Last updated: ${randomRoverPicture.earth_date}`);
    embed.addField('🌤️ Latest Weather', `📆 **Sol:** ${weather.sol}\n🌡️ **High:** ${weather.max_temp}\n❄️ **Low:** ${weather.min_temp}\n🗜️ **Pressure:** ${weather.pressure}\n☀️ **Sunrise:** ${weather.sunrise}\n🌑 **Sunset:** ${weather.sunset}`);
    embed.setImage(randomRoverPicture.img_src);
    embed.setColor(NyxxColors.SUCCESS);
    msg.editReply(embed);
  }
}
