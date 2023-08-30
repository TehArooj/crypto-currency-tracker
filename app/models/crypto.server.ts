import type { User, CryptoCurrency } from "@prisma/client";

import { prisma } from "~/db.server";

export const getCryptoCurrency = async ({
    id,
    userId,
}: Pick<CryptoCurrency, "id"> & {
    userId: User["id"];
}) => {
    return prisma.cryptoCurrency.findFirst({
        select: { id: true, name: true, rank: true, uid: true },
        where: { id, userId },
    });
}

export function getCryptoCurrencyListItems({ userId }: { userId: User["id"] }) {
    return prisma.cryptoCurrency.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
    });
}

export function createCryptoCurrency({
    id,
    rank,
    symbol,
    name,
    supply,
    maxSupply,
    marketCapUsd,
    volumeUsd24Hr,
    priceUsd,
    changePercent24Hr,
    vwap24Hr,
    explorer,
    userId,
}: Pick<CryptoCurrency, "id" | "rank" | "symbol" | "name" | "supply" | "maxSupply" | "marketCapUsd" | "volumeUsd24Hr" | "priceUsd" | "changePercent24Hr" | "vwap24Hr" | "explorer"> & {
    userId: User["id"];
}) {
    return prisma.cryptoCurrency.create({
        data: {
            id,
            rank,
            symbol,
            name,
            supply,
            maxSupply,
            marketCapUsd,
            volumeUsd24Hr,
            priceUsd,
            changePercent24Hr,
            vwap24Hr,
            explorer,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
}

export function deleteCryptoCurrency({
    id,
    userId,
}: Pick<CryptoCurrency, "id"> & { userId: User["id"] }) {
    return prisma.cryptoCurrency.deleteMany({
        where: { id, userId },
    });
}

export function updateCryptoCurrency({
    uid,
    id,
    rank,
    symbol,
    name,
    supply,
    maxSupply,
    marketCapUsd,
    volumeUsd24Hr,
    priceUsd,
    changePercent24Hr,
    vwap24Hr,
    explorer,
    userId,
}: Pick<CryptoCurrency, "uid" | "id" | "rank" | "symbol" | "name" | "supply" | "maxSupply" | "marketCapUsd" | "volumeUsd24Hr" | "priceUsd" | "changePercent24Hr" | "vwap24Hr" | "explorer"> & {
    userId: User["id"];
}) {
    return prisma.cryptoCurrency.update({
        where: { uid },
        data: {
            id,
            rank,
            symbol,
            name,
            supply,
            maxSupply,
            marketCapUsd,
            volumeUsd24Hr,
            priceUsd,
            changePercent24Hr,
            vwap24Hr,
            explorer,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
}
