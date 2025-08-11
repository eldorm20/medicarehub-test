import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { i18n } from '@/lib/i18n';
import { 
  Award,
  Gift,
  Star,
  Crown,
  Check,
  Truck,
  Bot,
  Percent
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LoyaltyTier {
  name: string;
  minPoints: number;
  maxPoints?: number;
  color: string;
  icon: any;
  perks: string[];
}

export function LoyaltyProgram() {
  const tiers: LoyaltyTier[] = [
    {
      name: i18n.t('loyalty.bronze'),
      minPoints: 0,
      maxPoints: 999,
      color: 'from-amber-600 to-amber-700',
      icon: Award,
      perks: [
        i18n.t('loyalty.perks.pointsPerSpend', { points: '1' }),
        i18n.t('loyalty.perks.basic') + ' ' + i18n.t('loyalty.perks.aiConsultations'),
        'Standard ' + i18n.t('loyalty.perks.delivery') + ' rates',
      ],
    },
    {
      name: i18n.t('loyalty.silver'),
      minPoints: 1000,
      maxPoints: 4999,
      color: 'from-slate-400 to-slate-500',
      icon: Star,
      perks: [
        i18n.t('loyalty.perks.pointsPerSpend', { points: '1.5' }),
        i18n.t('loyalty.perks.priority') + ' ' + i18n.t('loyalty.perks.aiConsultations'),
        '10% discount on ' + i18n.t('loyalty.perks.delivery'),
        i18n.t('loyalty.perks.healthReports'),
      ],
    },
    {
      name: i18n.t('loyalty.gold'),
      minPoints: 5000,
      color: 'from-yellow-400 to-yellow-500',
      icon: Crown,
      perks: [
        i18n.t('loyalty.perks.pointsPerSpend', { points: '2' }),
        i18n.t('loyalty.perks.unlimited') + ' ' + i18n.t('loyalty.perks.aiConsultations'),
        i18n.t('loyalty.perks.free') + ' ' + i18n.t('loyalty.perks.delivery'),
        i18n.t('loyalty.perks.exclusive') + ' ' + i18n.t('loyalty.perks.discounts'),
        i18n.t('loyalty.perks.advisor'),
      ],
    },
  ];

  // Mock user data
  const userPoints = 2450;
  const currentTier = tiers.find(tier => 
    userPoints >= tier.minPoints && (!tier.maxPoints || userPoints <= tier.maxPoints)
  ) || tiers[0];
  
  const nextTier = tiers.find(tier => tier.minPoints > userPoints);
  const progressToNext = nextTier 
    ? ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          {i18n.t('loyalty.title')}
        </h2>
        <p className="text-xl text-muted-foreground">
          {i18n.t('loyalty.subtitle')}
        </p>
      </div>

      {/* Current Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${currentTier.color} opacity-10`}></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${currentTier.color} rounded-xl flex items-center justify-center`}>
                  <currentTier.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{currentTier.name} Member</h3>
                  <p className="text-muted-foreground">{userPoints} {i18n.t('loyalty.points')}</p>
                </div>
              </div>
              <Badge className={`bg-gradient-to-r ${currentTier.color} text-white`}>
                Current Tier
              </Badge>
            </div>

            {nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progress to {nextTier.name}
                  </span>
                  <span className="font-medium text-foreground">
                    {nextTier.minPoints - userPoints} points needed
                  </span>
                </div>
                <Progress value={progressToNext} className="h-3" />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Tier Comparison */}
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => {
          const isCurrent = tier.name === currentTier.name;
          const isUpgrade = tier.minPoints > userPoints;
          
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden ${isCurrent ? 'ring-2 ring-primary' : ''}`}>
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Current Tier
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-5`}></div>
                <CardContent className={`p-6 ${isCurrent ? 'pt-12' : ''}`}>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <tier.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                    <p className="text-muted-foreground">
                      {tier.maxPoints 
                        ? i18n.t('loyalty.tier', { start: tier.minPoints, end: tier.maxPoints })
                        : i18n.t('loyalty.goldTier', { start: tier.minPoints })
                      }
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {tier.perks.map((perk, perkIndex) => (
                      <div key={perkIndex} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{perk}</span>
                      </div>
                    ))}
                  </div>

                  {isUpgrade && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={nextTier?.name !== tier.name}
                    >
                      {nextTier?.name === tier.name ? 'Next Tier' : 'Future Tier'}
                    </Button>
                  )}

                  {isCurrent && (
                    <Badge className={`w-full justify-center bg-gradient-to-r ${tier.color} text-white`}>
                      Active
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Benefits Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="h-5 w-5 mr-2 text-primary" />
              Loyalty Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Earn Points</h4>
                  <p className="text-sm text-muted-foreground">On every purchase</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Truck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Free Delivery</h4>
                  <p className="text-sm text-muted-foreground">Gold tier benefit</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">AI Priority</h4>
                  <p className="text-sm text-muted-foreground">Faster consultations</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Percent className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Exclusive Discounts</h4>
                  <p className="text-sm text-muted-foreground">Member-only offers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How to Earn Points */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Purchase medicines</span>
                  <Badge variant="secondary">1-2 points per 1,000 UZS</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">AI consultations</span>
                  <Badge variant="secondary">10 points each</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Upload prescriptions</span>
                  <Badge variant="secondary">5 points each</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Refer friends</span>
                  <Badge variant="secondary">100 points each</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Complete profile</span>
                  <Badge variant="secondary">50 points</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">Monthly bonus</span>
                  <Badge variant="secondary">25 points</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
