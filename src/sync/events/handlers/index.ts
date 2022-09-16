import { EnhancedEvent, OnChainData, processOnChainData } from "@/events-sync/handlers/utils";

import * as cryptopunks from "@/events-sync/handlers/cryptopunks";
import * as element from "@/events-sync/handlers/element";
import * as foundation from "@/events-sync/handlers/foundation";
import * as looksrare from "@/events-sync/handlers/looks-rare";
import * as nftx from "@/events-sync/handlers/nftx";
import * as nouns from "@/events-sync/handlers/nouns";
import * as quixotic from "@/events-sync/handlers/quixotic";
import * as seaport from "@/events-sync/handlers/seaport";
import * as sudoswap from "@/events-sync/handlers/sudoswap";
import * as wyvern from "@/events-sync/handlers/wyvern";
import * as x2y2 from "@/events-sync/handlers/x2y2";
import * as zeroExV4 from "@/events-sync/handlers/zeroex-v4";

export type EventsInfo = {
  kind:
    | "cryptopunks"
    | "element"
    | "foundation"
    | "looks-rare"
    | "nftx"
    | "nouns"
    | "quixotic"
    | "seaport"
    | "sudoswap"
    | "wyvern"
    | "x2y2"
    | "zeroex-v4";
  events: EnhancedEvent[];
  backfill?: boolean;
};

export const processEvents = async (info: EventsInfo) => {
  let data: OnChainData | undefined;
  switch (info.kind) {
    case "cryptopunks": {
      data = await cryptopunks.handleEvents(info.events);
      break;
    }

    case "element": {
      data = await element.handleEvents(info.events);
      break;
    }

    case "foundation": {
      data = await foundation.handleEvents(info.events);
      break;
    }

    case "looks-rare": {
      data = await looksrare.handleEvents(info.events);
      break;
    }

    case "nftx": {
      data = await nftx.handleEvents(info.events);
      break;
    }

    case "nouns": {
      data = await nouns.handleEvents(info.events);
      break;
    }

    case "quixotic": {
      data = await quixotic.handleEvents(info.events);
      break;
    }

    case "seaport": {
      data = await seaport.handleEvents(info.events);
      break;
    }

    case "sudoswap": {
      data = await sudoswap.handleEvents(info.events);
      break;
    }

    case "wyvern": {
      data = await wyvern.handleEvents(info.events);
      break;
    }

    case "x2y2": {
      data = await x2y2.handleEvents(info.events);
      break;
    }

    case "zeroex-v4": {
      data = await zeroExV4.handleEvents(info.events, info.backfill);
      break;
    }
  }

  if (data) {
    await processOnChainData(data, info.backfill);
  }
};