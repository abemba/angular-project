import {Routes} from "@angular/router";
import {LoginComponent} from "../auth/login/login.component";
import {IndexComponent} from "../dashboard/index/index.component";
import {IndexComponent as PrivateFundIndex} from "src/app/private-fund/index/index.component";
import {IndexComponent as SharedFundIndex} from "src/app/shared-fund/index/index.component";
import {SharedFundCardListComponent} from "../dashboard/shared-fund-card-list/shared-fund-card-list.component";
import {PrivateFundCardListComponent} from "../dashboard/private-fund-card-list/private-fund-card-list.component";
import {FundCategoryComponent} from "../dashboard/fund-category/fund-category.component";
import {MyAccountComponent} from "../dashboard/my-account/my-account.component";
import {ProfileComponent} from "../dashboard/my-account/profile/profile.component";
import {VerifyComponent} from "../dashboard/my-account/verify/verify.component";
import {AuthComponent} from "../dashboard/my-account/auth/auth.component";
import {PasswordComponent} from "../dashboard/my-account/password/password.component";
import {FundArchiveComponent} from "../dashboard/my-account/fund-archive/fund-archive.component";

// Private Funds
import {TransactionsComponent} from "../private-fund/transactions/transactions.component";
import {TransferOutComponent} from "../private-fund/transfer-out/transfer-out.component";
import {TransferInComponent} from "../private-fund/transfer-in/transfer-in.component";
import {PendingTransactionsComponent} from "../private-fund/pending-transactions/pending-transactions.component";
import {RecurringTransactionsComponent} from "../private-fund/recurring-transactions/recurring-transactions.component";
import {CommitComponent} from "../private-fund/commit/commit.component";
import {BalanceComponent} from "../private-fund/commit/balance/balance.component";
import {TimeComponent} from "../private-fund/commit/time/time.component";
import {SettingsComponent} from "../private-fund/settings/settings.component";

// Shared Funds
import {TransferOutComponent as SharedTransferOutComponent} from "src/app/shared-fund/transfer-out/transfer-out.component";
import {TransferInComponent as SharedTransferInComponent} from "src/app/shared-fund/transfer-in/transfer-in.component";
import {PendingTransactionsComponent as SharedPendingTransactionsComponent} from "src/app/shared-fund/pending-transactions/pending-transactions.component";
import {RecurringTransactionsComponent as SharedRecurringTransactionsComponent} from "src/app/shared-fund/recurring-transactions/recurring-transactions.component";
import {TransactionComponent as SharedTransactionComponent} from "src/app/shared-fund/transaction/transaction.component";
import {SettingsComponent as SharedSettingsComponent} from "src/app/shared-fund/settings/settings.component";
import {InviteComponent} from "../shared-fund/invite/invite.component";
import {MembersComponent} from "../shared-fund/members/members.component";
import {RequestsComponent} from "../shared-fund/requests/requests.component";
import {PeersRequestsComponent} from "../shared-fund/requests/peers-requests/peers-requests.component";
import {MyRequestsComponent} from "../shared-fund/requests/my-requests/my-requests.component";
import {RequestsHistoryComponent} from "../shared-fund/requests/requests-history/requests-history.component";
import {ActivityComponent} from "../shared-fund/activity/activity.component";
import {MarketComponent} from "../shared-fund/market/market.component";
import {SettingsIndexComponent} from "../shared-fund/settings/settings-index/settings-index.component";
import {EditNameComponent} from "../shared-fund/settings/edit-name/edit-name.component";
import {PolicyPickerComponent} from "../shared-fund/settings/policy-picker/policy-picker.component";
import {AuthGuard} from "../guards/auth.guard";
import {ConsentComponent} from "../shared-fund/consent/consent.component";
import {CreateFundComponent} from "../dashboard/create-fund/create-fund.component";
import {MyContactsComponent} from "../dashboard/my-contacts/my-contacts.component";

export const AppRoutes: Routes = [
    {path: "dashboard", component: IndexComponent, canActivate: [AuthGuard]},
    {path: "shared-funds", component: SharedFundCardListComponent, canActivate: [AuthGuard]},
    {path: "private-funds", component: PrivateFundCardListComponent, canActivate: [AuthGuard]},
    {path: "create", component: CreateFundComponent, canActivate: [AuthGuard]},
    {path: "fund-categories", component: FundCategoryComponent, canActivate: [AuthGuard]},


    {
        path: "my-account", component: MyAccountComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children:
            [
                {outlet: "myaccount", path: "", component: ProfileComponent},
                {outlet: "myaccount", path: "verify", component: VerifyComponent},
                {outlet: "myaccount", path: "email", component: AuthComponent},
                {outlet: "myaccount", path: "password", component: PasswordComponent},
                {outlet: "myaccount", path: "contacts", component: MyContactsComponent},
                {outlet: "myaccount", path: "archives", component: FundArchiveComponent},
            ]
    },

    {
        path: "private-funds/:id", component: PrivateFundIndex,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children:
            [
                {outlet: "private-fund", path: '', component: TransactionsComponent},
                {outlet: "private-fund", path: "transactions", component: TransactionsComponent},
                {outlet: "private-fund", path: "transfer-out", component: TransferOutComponent},
                {outlet: "private-fund", path: "transfer-in", component: TransferInComponent},
                {outlet: "private-fund", path: "transactions", component: TransferInComponent},
                {outlet: "private-fund", path: "pending", component: PendingTransactionsComponent},
                {outlet: "private-fund", path: "recurring", component: RecurringTransactionsComponent},
                {
                    outlet: "private-fund", path: "commit", component: CommitComponent,
                    children:
                        [
                            {outlet: "commit", path: "", component: BalanceComponent},
                            {outlet: "commit", path: "balance", component: BalanceComponent},
                            {outlet: "commit", path: "metric", component: BalanceComponent},
                            {outlet: "commit", path: "time", component: TimeComponent},
                        ]
                },
                {outlet: "private-fund", path: "settings", component: SettingsComponent},
            ],
    },

    {
        path: "shared-funds/:id", component: SharedFundIndex,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children:
            [
                {outlet: "shared-fund", path: '', component: SharedTransactionComponent},
                {outlet: "shared-fund", path: "transactions", component: SharedTransactionComponent},
                {outlet: "shared-fund", path: "transfer-out", component: SharedTransferOutComponent},
                {outlet: "shared-fund", path: "transfer-in", component: SharedTransferInComponent},
                {outlet: "shared-fund", path: "pending", component: SharedPendingTransactionsComponent},
                {outlet: "shared-fund", path: "recurring", component: SharedRecurringTransactionsComponent},
                {outlet: "shared-fund", path: "invite", component: InviteComponent},
                {outlet: "shared-fund", path: "consent", component: ConsentComponent},
                {outlet: "shared-fund", path: "members", component: MembersComponent},
                {
                    outlet: "shared-fund", path: "requests", component: RequestsComponent,
                    children:
                        [
                            {outlet: "requests", path: "", component: PeersRequestsComponent},
                            {outlet: "requests", path: "requests", component: PeersRequestsComponent},
                            {outlet: "requests", path: "my-requests", component: MyRequestsComponent},
                            {outlet: "requests", path: "history", component: RequestsHistoryComponent},
                        ]
                },
                {outlet: "shared-fund", path: "activity", component: ActivityComponent},
                {outlet: "shared-fund", path: "market", component: MarketComponent},
                {
                    outlet: "shared-fund", path: "settings", component: SharedSettingsComponent,
                    children:
                        [
                            {outlet: "settings", path: "", component: SettingsIndexComponent},
                            {outlet: "settings", path: "edit-name", component: EditNameComponent},
                            {outlet: "settings", path: "edit-action", component: PolicyPickerComponent},
                        ]
                },
            ]
    },

    {path: "login", component: LoginComponent},
    {path: "", redirectTo: "dashboard", pathMatch: "full"},
]
