/* eslint-disable camelcase */
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { NyxxColors, NyxxEmojis } from '../../../lib/Constants';
import NyxxClient from '../../struct/NyxxClient';
import NyxxEmbed from '../../struct/NyxxEmbed';
import NyxxFetch from '../../struct/NyxxFetch';

class MarsCommand extends Command {
  constructor() {
    super('mars', {
      aliases: ['mars', 'marsinfo'],
      description: 'Get information from the Mars 2020 Perserverance rover!',
      category: 'fun',
    });
  }

  async exec(msg: Message) {
    const embed = new NyxxEmbed(msg, this.client as NyxxClient);
    const fetcher = new NyxxFetch();

    embed.setTitle(`Fetching... ${NyxxEmojis.LOADING}`);
    embed.setColor(NyxxColors.WARN);
    const m = await msg.channel.send(embed);

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

    embed.setTitle('Latest Data');
    embed.setDescription(`Last updated: ${randomRoverPicture.earth_date}`);
    embed.addField('🌤️ Latest Weather', `📆 **Sol:** ${weather.sol}\n🌡️ **High:** ${weather.max_temp}\n❄️ **Low:** ${weather.min_temp}\n🗜️ **Pressure:** ${weather.pressure}\n☀️ **Sunrise:** ${weather.sunrise}\n🌑 **Sunset:** ${weather.sunset}`);
    embed.setImage(randomRoverPicture.img_src);
    embed.setColor(NyxxColors.SUCCESS);
    m.edit(embed);
  }
}

export default MarsCommand;
