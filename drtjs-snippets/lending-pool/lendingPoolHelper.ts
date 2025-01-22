import { createAirdropService, createESDTInteractor, ITestSession, ITestUser } from "@ numbatnetwork/erdjs-snippets";
import { TokenPayment } from "@ numbatnetwork/erdjs/out";
import { createLendingInteractor } from "./lendingPoolInteractor";



export async function helperIssueToken(session: ITestSession, whale: ITestUser, tokenBreadcrumbName: string, tokenName: string) {
    let interactor = await createESDTInteractor(session);
    let issuedToken = await interactor.issueFungibleToken(whale, { name: tokenName, ticker: tokenName, decimals: 18, supply: "1000000000000000000000" })
    await session.saveToken({name: tokenBreadcrumbName, token: issuedToken});
}

export async function helperAddLiquidityPool(session: ITestSession, whale: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);
    let lendAddress = await session.loadAddress("lendingAddr");
    let interactor = await createLendingInteractor(session, lendAddress);

    let returnCode = await interactor.addLiquidityPool(whale, token.identifier, 0, 40000000, 1000000000, 800000000, 100000000, 700000000);
    return returnCode.isSuccess();

}

export async function helperIssueLendToken(session: ITestSession, whale: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);
    let lendAddress = await session.loadAddress("lendingAddr");
    let interactor = await createLendingInteractor(session, lendAddress);

    let returnCode = await interactor.issueLend(whale, token.identifier);
    return returnCode.isSuccess();
}

export async function helperIssueBorrowToken(session: ITestSession, whale: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);
    let lendAddress = await session.loadAddress("lendingAddr");
    let interactor = await createLendingInteractor(session, lendAddress);

    let returnCode = await interactor.issueBorrow(whale, token.identifier);
    return returnCode.isSuccess();
}


export async function helperSetLendRoles(session: ITestSession, whale: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);
    let lendAddress = await session.loadAddress("lendingAddr");
    let interactor = await createLendingInteractor(session, lendAddress);
    
    let returnCode = await interactor.setLendRoles(whale, token.identifier);
    return returnCode.isSuccess();
}
    
export async function helperSetBorrowRoles(session: ITestSession, whale: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);
    let lendAddress = await session.loadAddress("lendingAddr");
    let interactor = await createLendingInteractor(session, lendAddress);
    
    let returnCode = await interactor.setBorrowRoles(whale, token.identifier);
    return returnCode.isSuccess();
}

export async function helperSetAssetLoanToValue(session: ITestSession, whale: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);
    let lendAddress = await session.loadAddress("lendingAddr");
    let interactor = await createLendingInteractor(session, lendAddress);
    
    let returnCode = await interactor.setAssetLoanToValue(whale, token.identifier, 500000000);
    return returnCode.isSuccess();
}

export async function helperSetAssetLiquidationBonus(session: ITestSession, whale: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);
    let lendAddress = await session.loadAddress("lendingAddr");
    let interactor = await createLendingInteractor(session, lendAddress);
    
    let returnCode = await interactor.setAssetLiquidationBonus(whale, token.identifier, 40000000);
    return returnCode.isSuccess();
}

export async function helperAirdropTokens(session: ITestSession, whale: ITestUser, firstUser: ITestUser, secondUser: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);
    let airdrop = createAirdropService(session);
    
    await session.syncUsers([whale]);
    await airdrop.sendToEachUser(whale, [firstUser, secondUser], [TokenPayment.fungibleFromAmount(token.identifier, "500", token.decimals)]);
}

export async function helperSetAggregatorForLP(session: ITestSession, whale: ITestUser, tokenName: string) {
    let token = await session.loadToken(tokenName);

    let lendingAddress = await session.loadAddress("lendingAddr");
    let priceAggregatorAddress = await session.loadAddress("priceAggregatorAddress");

    let lendingInteractor = await createLendingInteractor(session, lendingAddress);
    let returnCode = await lendingInteractor.setAggregator(whale, token.identifier, priceAggregatorAddress);

    return returnCode.isSuccess();
}

